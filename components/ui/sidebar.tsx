import { useState } from "react";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-black text-white w-64 min-h-screen">
      <div className="sticky top-0 bg-black text-white py-4 px-6">
        <h2 className="text-xl font-semibold">Documentation</h2>
        <button onClick={toggleCollapse} className="text-white mt-2">
          {isCollapsed ? "Expand" : "Collapse"} Sidebar
        </button>
      </div>

      <div className={`transition-all ${isCollapsed ? "hidden" : "block"} px-4 py-6`}>
        <div>
          <ul>
            <SidebarGroup title="Steps">
              <SidebarItem
                title="Step 1: Extract the Downloaded File"
                onClick={() => alert("Step 1 clicked")}
              />
              <SidebarItem
                title="Step 2: Navigate to the Folder Directory"
                onClick={() => alert("Step 2 clicked")}
              />
              <SidebarItem
                title="Step 3: Install Required Packages"
                onClick={() => alert("Step 3 clicked")}
              />
              <SidebarItem
                title="Step 4: Run main.py"
                onClick={() => alert("Step 4 clicked")}
              />
            </SidebarGroup>
          </ul>
        </div>
      </div>

      <SidebarFooter />
    </div>
  );
}

function SidebarGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function SidebarItem({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <li
      onClick={onClick}
      className="cursor-pointer text-sm py-2 hover:bg-gray-700 px-4 rounded"
    >
      {title}
    </li>
  );
}

function SidebarFooter() {
  return (
    <div className="absolute bottom-0 bg-black text-white py-4 px-6">
      <button className="text-white">Back to Download Page</button>
    </div>
  );
}

export default Sidebar;
