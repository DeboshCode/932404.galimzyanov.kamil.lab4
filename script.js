"use strict";

const weeklyRevenue = [2500, 12000, 3000, 15000, 10000, 11000, 2000];
const lowRevenueExample = [0, 1500, 3000, 4200, 2000, 1000, 500];

function findMax(numbers) {
    if (numbers.length === 0) {
        return null;
    }

    let maximum = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > maximum) {
            maximum = numbers[i];
        }
    }

    return maximum;
}

function filterHighRevenue(numbers) {
    return numbers.filter(function (amount) {
        return amount > 10000;
    });
}

function calculateSum(numbers) {
    let sum = 0;

    for (const amount of numbers) {
        sum += amount;
    }

    return sum;
}

function analyzeRevenue(numbers) {
    const total = calculateSum(numbers);
    const highRevenue = filterHighRevenue(numbers);
    let lowCount = 0;

    for (const amount of numbers) {
        if (amount <= 3000) {
            lowCount++;
        }
    }

    return {
        total: total,
        maximum: findMax(numbers),
        average: numbers.length === 0 ? 0 : total / numbers.length,
        highRevenue: highRevenue,
        lowCount: lowCount,
        lowShare: numbers.length === 0 ? 0 : lowCount / numbers.length * 100
    };
}

function formatNumber(number) {
    return number.toLocaleString("ru-RU", { maximumFractionDigits: 2 });
}

function displayRevenueReport(numbers, report, title) {
    document.getElementById("revenue-example-title").textContent = title;
    document.getElementById("revenue-values").textContent = numbers.map(formatNumber).join("; ");
    document.getElementById("revenue-total").textContent = formatNumber(report.total) + " ₽";
    document.getElementById("revenue-max").textContent = report.maximum === null ? "Нет данных" : formatNumber(report.maximum) + " ₽";
    document.getElementById("revenue-average").textContent = formatNumber(report.average) + " ₽";
    document.getElementById("revenue-high-count").textContent = report.highRevenue.length;
    document.getElementById("revenue-low-count").textContent = report.lowCount;
    document.getElementById("revenue-low-share").textContent = formatNumber(report.lowShare) + "%";
    document.getElementById("revenue-high-values").textContent = report.highRevenue.length === 0
        ? "Нет таких дней"
        : report.highRevenue.map(formatNumber).join("; ");
}

function showRevenueReport(numbers, title) {
    const enteredName = prompt("Как вас зовут?");
    const name = enteredName === null || enteredName.trim() === "" ? "гость" : enteredName.trim();
    const report = analyzeRevenue(numbers);

    displayRevenueReport(numbers, report, title);

    alert("Здравствуйте, " + name + "!\nОбщая выручка – " + formatNumber(report.total)
        + " ₽, в " + report.highRevenue.length + " днях показатели были высокими.");

    console.log("Дневная выручка, ₽:", numbers);
    console.log("Общая выручка, ₽:", report.total);
    console.log("Максимальная дневная выручка, ₽:", report.maximum);
    console.log("Дни с выручкой свыше 10 000 ₽:", report.highRevenue);
    console.log("Средняя дневная выручка, ₽:", formatNumber(report.average));
    console.log("Количество дней с низкой выручкой:", report.lowCount);
    console.log("Доля дней с низкой выручкой:", formatNumber(report.lowShare) + "%");

    if (report.average < 5000) {
        console.log("Стоит проанализировать причины низкой выручки");
    }
}

document.getElementById("regular-week").addEventListener("click", function () {
    showRevenueReport(weeklyRevenue, "Обычная неделя");
});

document.getElementById("low-week").addEventListener("click", function () {
    showRevenueReport(lowRevenueExample, "Неделя с низкой выручкой");
});

displayRevenueReport(weeklyRevenue, analyzeRevenue(weeklyRevenue), "Обычная неделя");
