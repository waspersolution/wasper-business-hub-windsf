
export function useChartTransformations() {
  const tooltipFormatter = (value: number | string | Array<number | string>): [string, string] => {
    if (typeof value === 'number') {
      return [`₦${value.toLocaleString()}`, ''];
    }
    return [value.toString(), ''];
  };

  return { tooltipFormatter };
}
