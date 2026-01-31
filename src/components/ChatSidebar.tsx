
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FolderIcon,
  MessageSquare,
  MoreVertical,
} from "lucide-react";
import { cn } from "../lib/utils";

/* =======================
   Types
======================= */

export type ExplorerNode = {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: ExplorerNode[];
};

type ExplorerItemProps = {
  node: ExplorerNode;
  level?: number;
  expanded: Set<string>;
  toggle: (id: string) => void;
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
};

/* =======================
   Sample Tree Data
======================= */

export const explorerTree: ExplorerNode[] = [
  {
    id: "recent",
    name: "Recent History",
    type: "folder",
    children: [
      {
        id: "recent-math",
        name: "Mathematics",
        type: "folder",
        children: [
          {
            id: "recent-math-calculus",
            name: "Calculus",
            type: "folder",
            children: [
              {
                id: "recent-math-calculus-basics",
                name: "Calculus Basics",
                type: "file",
              },
              {
                id: "recent-math-calculus-derivatives",
                name: "Derivatives Practice",
                type: "file",
              },
            ],
          },
          {
            id: "recent-math-algebra",
            name: "Algebra",
            type: "folder",
            children: [
              {
                id: "recent-math-algebra-linear",
                name: "Linear Equations",
                type: "file",
              },
              {
                id: "recent-math-algebra-quadratic",
                name: "Quadratic Problems",
                type: "file",
              },
            ],
          },
        ],
      },
      {
        id: "recent-physics",
        name: "Physics",
        type: "folder",
        children: [
          {
            id: "recent-physics-mechanics",
            name: "Mechanics",
            type: "folder",
            children: [
              {
                id: "recent-physics-mechanics-laws",
                name: "Newton’s Laws",
                type: "file",
              },
              {
                id: "recent-physics-mechanics-motion",
                name: "Motion Problems",
                type: "file",
              },
            ],
          },
        ],
      },
      {
        id: "recent-ps4",
        name: "Problem Set 4",
        type: "file",
      },
    ],
  },

  {
    id: "archive",
    name: "Archived Sessions",
    type: "folder",
    children: [
      {
        id: "archive-2025",
        name: "Year 2025",
        type: "folder",
        children: [
          {
            id: "archive-2025-finals",
            name: "Final Exams",
            type: "folder",
            children: [
              {
                id: "archive-2025-finals-math",
                name: "Math Final Paper",
                type: "file",
              },
              {
                id: "archive-2025-finals-chem",
                name: "Chemistry Final Paper",
                type: "file",
              },
            ],
          },
        ],
      },
      {
        id: "archive-2024",
        name: "Year 2024",
        type: "folder",
        children: [
          {
            id: "archive-2024-labs",
            name: "Lab Work",
            type: "folder",
            children: [
              {
                id: "archive-2024-labs-chem",
                name: "Chemistry Lab",
                type: "file",
              },
              {
                id: "archive-2024-labs-phy",
                name: "Physics Lab",
                type: "file",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "templates",
    name: "Templates",
    type: "folder",
    children: [
      {
        id: "templates-exam",
        name: "Exam Templates",
        type: "folder",
        children: [
          {
            id: "templates-exam-mid",
            name: "Midterm Template",
            type: "file",
          },
          {
            id: "templates-exam-final",
            name: "Final Exam Template",
            type: "file",
          },
        ],
      },
      {
        id: "templates-notes",
        name: "Notes Templates",
        type: "folder",
        children: [
          {
            id: "templates-notes-daily",
            name: "Daily Study Notes",
            type: "file",
          },
        ],
      },
    ],
  },
];

/* =======================
   Recursive Explorer Item
======================= */

const INDENT = 16;

function ExplorerItem({
  node,
  level = 0,
  expanded,
  toggle,
  activeChatId,
  onChatSelect,
}: ExplorerItemProps) {
  const isFolder = node.type === "folder";
  const isOpen = expanded.has(node.id);

  return (
    <div>
  

      <button
        type="button"
        onClick={() =>
          isFolder ? toggle(node.id) : onChatSelect(node.id)
        }
        className={cn(
          "w-full flex items-center px-2 py-2 rounded-lg text-sm transition-all text-left group",
          !isFolder && activeChatId === node.id
            ? "bg-white/10 text-white"
            : "hover:bg-white/5 text-slate-400 hover:text-slate-200"
        )}
        style={{ paddingLeft: `${level * INDENT + 8}px` }}
      >
        {/* Arrow */}
        {isFolder ? (
          <span className="mr-1 text-slate-500">
            {isOpen ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </span>
        ) : (
          <span className="w-[14px] mr-1" />
        )}

        {/* Icon */}
        <span className="mr-2">
          {isFolder ? (
            <FolderIcon size={14} />
          ) : (
            <MessageSquare size={14} />
          )}
        </span>

        {/* Name */}
        <span className="flex-1 truncate">{node.name}</span>

        {/* Menu */}
        {!isFolder && (
          <MoreVertical
            size={14}
            className="opacity-0 group-hover:opacity-100 text-slate-500"
          />
        )}
      </button>

      {/* Children */}
      {isFolder &&
        isOpen &&
        node.children?.map(child => (
          <ExplorerItem
            key={child.id}
            node={child}
            level={level + 1}
            expanded={expanded}
            toggle={toggle}
            activeChatId={activeChatId}
            onChatSelect={onChatSelect}
          />
        ))}
    </div>
  );
}

/* =======================
   Sidebar Component
======================= */

export default function ChatSidebar({
  activeChatId,
  onChatSelect,
  isOpen,
  onClose,
}: {
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["recent"])
  );

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <>
   
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50",
          "w-[280px] md:w-[300px]",
          "bg-slate-700 text-slate-300 border-r border-slate-800",
          "transform transition-transform duration-300",
          isOpen ? "translate-y-0" : "-translate-y-full",
          "md:translate-y-0"
        )}
      >
        <div className="flex-1 overflow-y-auto px-2 py-4">
          {explorerTree.map(node => (
            <ExplorerItem
              key={node.id}
              node={node}
              expanded={expandedFolders}
              toggle={toggleFolder}
              activeChatId={activeChatId}
              onChatSelect={onChatSelect}
            />
          ))}
        </div>
      </aside>
    </>
  );
}

