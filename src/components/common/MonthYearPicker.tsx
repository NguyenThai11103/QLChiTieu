'use client';

import { useFinanceStore } from "@/store/finance.store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays } from "lucide-react";

const months = [
    { value: '1', label: 'Tháng 1' }, { value: '2', label: 'Tháng 2' },
    { value: '3', label: 'Tháng 3' }, { value: '4', label: 'Tháng 4' },
    { value: '5', label: 'Tháng 5' }, { value: '6', label: 'Tháng 6' },
    { value: '7', label: 'Tháng 7' }, { value: '8', label: 'Tháng 8' },
    { value: '9', label: 'Tháng 9' }, { value: '10', label: 'Tháng 10' },
    { value: '11', label: 'Tháng 11' }, { value: '12', label: 'Tháng 12' },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

export function MonthYearPicker() {
    const { selectedMonth, selectedYear, setMonth, setYear } = useFinanceStore();

    return (
        <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <Select value={String(selectedMonth)} onValueChange={(v) => setMonth(Number(v))}>
                <SelectTrigger className="w-32">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {months.map(m => (
                        <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={String(selectedYear)} onValueChange={(v) => setYear(Number(v))}>
                <SelectTrigger className="w-24">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {years.map(y => (
                        <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
