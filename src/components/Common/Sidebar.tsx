import { Icon } from "@ui5/webcomponents-react";
import Link from "next/link";

// Icons
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/time-off.js';

const Sidebar = () => {
  return (
    <div className="bg-[#0B1F33] text-white p-6 w-72 min-h-screen border-r border-[#14324A] shadow-lg">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-extrabold text-blue-300 mb-1 tracking-tight">
          Leave Request App
        </h1>
        <p className="text-sm text-blue-100 opacity-70">
          Manage your leave requests
        </p>
      </div>

      <hr className="border-[#1A4566] mb-6" />

      {/* Navigation */}
      <ul className="space-y-4 text-base font-medium">
        <li>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-md text-blue-100 hover:bg-[#14324A] hover:text-white transition"
          >
            <Icon name="home" className="text-blue-100" style={{ fontSize: '1.25rem' }} />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/leave-requests"
            className="flex items-center gap-3 px-4 py-2 rounded-md text-blue-100 hover:bg-[#14324A] hover:text-white transition"
          >
            <Icon name="time-off" className="text-blue-100" style={{ fontSize: '1.25rem' }} />
            Leave Requests
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;