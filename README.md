# 📘 Leave Request App

A UI5-based leave management application built with **Next.js 15**, **React 19**, and **UI5 Web Components for React**. This app allows users to filter, view, and manage leave requests through a dynamic, filterable table interface with a modern UI.

---

## ✅ What’s Implemented

### 🌟 Features

* **Data Fetching**: Loads leave request data from an external API (`useLeaveRequestsApi`).
* **Filtering**: Filters requests by status, type of leave, and date using UI5 `<FilterBar>` and `<Select>` components.
* **Sorting**: Sorts requests by creation date using `<SegmentedButton>`.
* **Status Update**: Updates request status through an action menu with approve/reject options.
* **Popover for Long Reasons**: Displays full text in a popover when the reason is long.
* **Responsive UI**: Clean and responsive layout using Tailwind CSS and UI5.

---

## 🚀 How to Run the Project

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server (Turbopack)

```bash
npm run dev
```

Then open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🧪 How to Run the Tests

### Run all tests

```bash
npm test
```

### Run in watch mode (recommended for dev)

```bash
npm run test:watch
```

### Run tests with coverage

```bash
npm run test:coverage
```

> ℹ️ If you're using UI5 mocks, `--coverage` may be slower due to instrumentation.

---

## 🧩 UI5 Web Components Used

This project uses [@ui5/webcomponents-react](https://sap.github.io/ui5-webcomponents-react/) and includes the following components:

| UI5 Component       | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `FilterBar`         | Filtering interface container            |
| `FilterGroupItem`   | Input groups inside the filter bar       |
| `Select` / `Option` | Dropdowns for filtering type and status  |
| `SegmentedButton`   | Sorting controls (Ascendant/Descendant)  |
| `AnalyticalTable`   | Main data table for requests             |
| `Tag`               | Colored labels for leave type and status |
| `Button`            | Action menu trigger                      |
| `Menu` / `MenuItem` | Action list (Approve / Reject)           |
| `Popover`           | Displays full leave reason on demand     |
| `Toast`             | Feedback message after status update     |
| `Text`, `Title`     | Readable UI text and labels              |
| `Icon`              | Sidebar navigation icons                 |
| `ThemeProvider`     | Enables consistent UI5 theming           |

---

## 🧠 Folder Highlights

* `components/`

  * `RequestsFilter.tsx` – Handles filtering logic and UI.
  * `RequestsTable.tsx` – Displays filtered data with actions.
  * `Sidebar.tsx` – Left-side navigation using UI5 Icons.
* `hooks/`

  * `useLeaveRequestsApi.ts` – Fetching and local mutation logic.
* `__tests__/` – Contains integration and unit tests.

---

## 💡 Notes

* This project uses **custom UI5 mocks** for testing.
* Coverage reports and open handle detection are configured in `jest.config.js`.
* Styled with **TailwindCSS v4** and fonts via Google Fonts (Geist Sans + Mono).

---

