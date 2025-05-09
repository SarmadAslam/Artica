// statsHelpers.ts

interface MonthData {
  name: string;
  count: number;
  date: Date;
}

export function groupByMonth(data: any[] = [], dateKey = 'createdAt'): MonthData[] {
  const grouped: { [key: string]: MonthData } = {};

  data.forEach(item => {
    const rawDate = item[dateKey];
    if (!rawDate) return;

    const date = new Date(rawDate);
    if (isNaN(date.getTime())) return;

    const key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    const bucketDate = new Date(date.getFullYear(), date.getMonth(), 1);

    if (!grouped[key]) {
      grouped[key] = {
        name: key,
        count: 0,
        date: bucketDate
      };
    }

    grouped[key].count += 1;
  });

  return Object.values(grouped).sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function calculateStats(data: MonthData[] = []) {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);
  const sorted = [...data].sort((a, b) => b.date.getTime() - a.date.getTime());

  const lastMonth = sorted[0]?.count || 0;
  const prevMonth = sorted[1]?.count || 0;

  let growth = '0';
  if (prevMonth === 0) {
    growth = lastMonth > 0 ? '100' : '0';
  } else {
    growth = (((lastMonth - prevMonth) / prevMonth) * 100).toFixed(0);
  }

  return {
    total,
    lastMonth,
    growth
  };
}
