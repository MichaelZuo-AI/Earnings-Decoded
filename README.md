# Earnings-Decoded

Company business analysis and earnings interpretation in Chinese — powered entirely by Claude Code.

## Three Report Types

| Command | Report | Description |
|---|---|---|
| `Apple` | 财报解读 | Latest earnings breakdown with beat/miss analysis |
| `前瞻 AAPL` | 财报前瞻 | Pre-earnings preview with estimates and key metrics to watch |
| `分析 BABA` | 企业经营分析 | Four-perspective business analysis (Observer, Strategist, CEO, Investment Advisor) |

## How It Works

1. Open Claude Code in this directory
2. Type a command (see table above)
3. Claude searches for data, analyzes it, and generates a styled HTML report
4. A PDF copy is auto-generated for sharing
5. Report auto-opens in your browser

## Output

Reports are saved to `reports/` as self-contained HTML + PDF files:

```
reports/AAPL-2025-Q1.html              # 财报解读
reports/AAPL-2025-Q1.pdf               # PDF for sharing
reports/AAPL-2025-Q2-preview.html      # 财报前瞻
reports/BABA-analysis-2026-02.html     # 企业经营分析
```

Each HTML report also has a floating "导出 PDF" button for manual export via the browser print dialog.

## Report Sections

### 财报解读 (Earnings Breakdown)

| Section | Content |
|---|---|
| 公司概览 | Company info, report period, stock price |
| 核心指标 | Revenue, EPS, margins with beat/miss indicators |
| 收入分析 | Segment and geographic breakdown |
| 业绩亮点与不足 | Key beats and misses explained |
| 前瞻指引 | Management guidance vs. consensus |
| 风险提示 | Key risks and concerns |
| 投资者总结 | Plain-language "So What?" for investors |

### 财报前瞻 (Earnings Preview)

| Section | Content |
|---|---|
| 公司概览 | Upcoming earnings date, current stock price |
| 市场预期 | Consensus estimates for revenue, EPS |
| 上季回顾 | Last quarter recap |
| 本季看点 | Key things to watch this quarter |
| 历史表现 | Beat/miss track record |
| 近期动态 | Recent news and analyst actions |
| 投资者关注点 | What matters most going in |

### 企业经营分析 (Four-Perspective Analysis)

| Section | Content |
|---|---|
| 企业画像 | Company profile and key facts |
| 🔍 观察者 | Buffett-style business quality analysis (moat, financials, management) |
| 🧭 战略家 | Strategic direction (trends, positioning, recommendations) |
| 👔 CEO视角 | Action plan (priorities, 3-year timeline, 5-year vision) |
| 💰 投资顾问 | Buffett-style investment assessment (intrinsic value, valuation, 10-year outlook) |
| 📋 四维总结 | Synthesis dashboard with verdicts from all four perspectives |

## Requirements

- [Claude Code](https://claude.ai/code) CLI with active subscription
- macOS (uses `open` to launch browser)
- Google Chrome (for PDF generation)
- `npm install` (one-time setup for puppeteer-core)

## Zero API Cost

This project runs entirely on your Claude subscription via Claude Code CLI. No additional API keys or costs required.
