import React, { FC, useRef, useState } from "react";
import classNames from "classnames";
import Tooltip from "components/Tooltip";
import "./DoughnutChart.scss";

export type Segment = {
  /**
   * The colour of the segment.
   */
  color: string;
  /**
   * The segment tooltip.
   */
  tooltip?: string;
  /**
   * The segment length.
   */
  value: number;
};

export type Props = {
  /**
   * The label in the centre of the doughnut.
   */
  label?: string;
  /**
   * An optional class name applied to the label.
   */
  labelClassname?: string;
  /**
   * An optional class name applied to the wrapping element.
   */
  className?: string;
  /**
   * The width of the segments when hovered.
   */
  segmentHoverWidth: number;
  /**
   * The width of the segments.
   */
  segmentThickness: number;
  /**
   * The doughnut segments.
   */
  segments: Segment[];
  /**
   * The size of the doughnut.
   */
  size: number;
  /**
   *  ID associated to the specific instance of a Chart.
   */
  chartID: string;
};

export enum TestIds {
  Label = "label",
  Segment = "segment",
  Chart = "chart",
  Section = "Section",
}

const DoughnutChart: FC<Props> = ({
  className,
  label,
  labelClassname,
  segmentHoverWidth,
  segmentThickness,
  segments,
  size,
  chartID,
}): React.JSX.Element => {
  const [tooltipMessage, setTooltipMessage] = useState<
    Segment["tooltip"] | null
  >(null);

  const id = useRef(`doughnut-chart-${chartID}`);
  const hoverIncrease = segmentHoverWidth - segmentThickness;
  const adjustedHoverWidth = segmentHoverWidth + hoverIncrease;
  // The canvas needs enough space so that the hover state does not get cut off.
  const canvasSize = size + adjustedHoverWidth - segmentThickness;
  const diameter = size - segmentThickness;
  const radius = diameter / 2;
  const circumference = Math.round(diameter * Math.PI);
  // Calculate the total value of all segments.
  const total = segments.reduce(
    (totalValue, segment) => (totalValue += segment.value),
    0,
  );

  // Pre-calculate the accumulated lengths.
  const segmentsWithOffsets = segments.reduce((acc, segment, i) => {
    const previousSegment = i > 0 ? acc[i - 1] : null;
    // The start position is the value of all previous segments.
    const startPosition =
      i === 0
        ? 0
        : previousSegment.startPosition + previousSegment.segmentLength;
    // The length of the segment (as a portion of the doughnut circumference)
    const segmentLength = (segment.value / total) * circumference;
    // The space left until the end of the circle.
    const remainingSpace = circumference - (segmentLength + startPosition);

    acc.push({
      ...segment,
      startPosition,
      segmentLength,
      remainingSpace,
    });
    return acc;
  }, []);

  // Map over the enriched data.
  const segmentNodes = segmentsWithOffsets.map(
    (
      { color, tooltip, value, startPosition, segmentLength, remainingSpace },
      i,
    ) => {
      return (
        <circle
          className="doughnut-chart__segment"
          cx={radius - segmentThickness / 2 - hoverIncrease}
          cy={radius + segmentThickness / 2 + hoverIncrease}
          data-testid={TestIds.Segment}
          key={i}
          tabIndex={0}
          aria-label={tooltip ? `${tooltip}: ${value}` : `${value}`}
          onMouseOut={
            tooltip
              ? () => {
                  // Hide the tooltip.
                  setTooltipMessage(null);
                }
              : undefined
          }
          onMouseOver={
            tooltip
              ? () => {
                  setTooltipMessage(tooltip);
                }
              : undefined
          }
          r={radius}
          style={{
            stroke: color,
            strokeWidth: segmentThickness,
            // The dash array used is:
            // 1 - We want there to be a space before the first visible dash so
            //     by setting this to 0 we can use the next dash for the space.
            // 2 - This gap is the distance of all previous segments
            //     so that the segment starts in the correct spot.
            // 3 - A dash that is the length of the segment.
            // 4 - A gap from the end of the segment to the start of the circle
            //     so that the dash array doesn't repeat and be visible.
            strokeDasharray: `0 ${startPosition.toFixed(
              2,
            )} ${segmentLength.toFixed(2)} ${remainingSpace.toFixed(2)}`,
          }}
          // Rotate the segment so that the segments start at the top of
          // the chart.
          transform={`rotate(-90 ${radius},${radius})`}
        />
      );
    },
  );

  return (
    <div
      className={classNames("doughnut-chart", className)}
      style={{ maxWidth: `${canvasSize}px` }}
      data-testid={TestIds.Chart}
    >
      <Tooltip
        className="doughnut-chart__tooltip"
        followMouse={true}
        message={tooltipMessage}
        position="right"
      >
        <style>
          {/* Set the hover width of the segments. */}
          {`#${id.current} .doughnut-chart__segment:hover {
          stroke-width: ${adjustedHoverWidth} !important;
        }`}
        </style>
        <svg
          className="doughnut-chart__chart"
          id={id.current}
          viewBox={`0 0 ${canvasSize} ${canvasSize}`}
          data-testid={TestIds.Section}
          aria-labelledby={`${id.current}-chart-title ${id.current}-chart-desc`}
        >
          {label && <title id={`${id.current}-chart-title`}>{label}</title>}
          <desc id={`${id.current}-chart-desc`}>
            {segments
              .map((segment) => {
                let description = "";
                if (segment.tooltip) description += `${segment.tooltip}: `;
                description += segment.value;
                return description;
              })
              .join(",")}
          </desc>

          <mask id="canvasMask">
            {/* Cover the canvas, this will be the visible area. */}
            <rect
              fill="white"
              height={canvasSize}
              width={canvasSize}
              x="0"
              y="0"
            />
            {/* Cut out the center circle so that the hover state doesn't grow inwards. */}
            <circle
              cx={canvasSize / 2}
              cy={canvasSize / 2}
              fill="black"
              r={radius - segmentThickness / 2}
            />
          </mask>
          <g mask="url(#canvasMask)">
            {/* Force the group to cover the full size of the canvas, otherwise it will only mask the children (in their non-hovered state) */}
            <rect
              fill="transparent"
              height={canvasSize}
              width={canvasSize}
              x="0"
              y="0"
            />
            <g>{segmentNodes}</g>
          </g>
          {label ? (
            <text
              x={radius + adjustedHoverWidth / 2}
              y={radius + adjustedHoverWidth / 2}
            >
              <tspan
                className={classNames("doughnut-chart__label", labelClassname)}
                data-testid={TestIds.Label}
              >
                {label}
              </tspan>
            </text>
          ) : null}
        </svg>
      </Tooltip>
    </div>
  );
};

export default DoughnutChart;
