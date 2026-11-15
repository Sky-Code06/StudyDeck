import React, { useState } from "react";
import {
  Network,
  CheckCircle2,
  Clock,
  Circle,
  ArrowRight,
  BookOpen,
  Sparkles,
  Link2
} from "lucide-react";

export function ConceptMap({
  deck,
  progress,
  updateNodeStatus,
  setSelectedTopicId,
  setActiveTab
}) {
  const [selectedNodeId, setSelectedNodeId] = useState(
    deck?.conceptNodes?.[0]?.id || null
  );

  const nodes = deck?.conceptNodes || [];
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0] || null;

  // Group nodes by module
  const modulesMap = {};
  deck?.modules?.forEach((m) => {
    modulesMap[m.id] = m.title;
  });

  const getNodeStatus = (node) => {
    return progress?.nodeStatuses?.[node.id] || node.status || "unvisited";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "mastered":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/40 text-emerald-300",
          dot: "bg-emerald-400",
          label: "Mastered"
        };
      case "learning":
        return {
          bg: "bg-amber-500/10 border-amber-500/40 text-amber-300",
          dot: "bg-amber-400",
          label: "In Progress"
        };
      default:
        return {
          bg: "bg-slate-900 border-slate-800 text-slate-400",
          dot: "bg-slate-600",
          label: "Unvisited"
        };
    }
  };

  if (!nodes.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
        <Network className="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <p>No concept nodes defined for this deck yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Intro Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-1">
            <Network className="h-4 w-4" />
            <span>Interactive Concept Mind Map & Prerequisite Graph</span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            See how concepts interconnect. Follow prerequisites from foundational principles to advanced systems to avoid gaps in understanding.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Mastered
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> Learning
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-600" /> Unvisited
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node Graph Grid (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nodes.map((node) => {
              const status = getNodeStatus(node);
              const styling = getStatusColor(status);
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`relative rounded-xl border p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "ring-2 ring-indigo-500 bg-indigo-950/20 border-indigo-500/50 shadow-lg"
                      : "hover:border-slate-700 bg-slate-900/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-200 line-clamp-1">
                      {node.label}
                    </span>
                    <span
                      className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border ${styling.bg}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${styling.dot}`} />
                      {styling.label}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {node.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-2">
                    <span className="truncate max-w-[150px]">
                      {modulesMap[node.module] || "General"}
                    </span>
                    {node.prerequisites && node.prerequisites.length > 0 && (
                      <span className="flex items-center gap-1 text-indigo-400 font-mono text-[10px]">
                        <Link2 className="h-3 w-3" /> {node.prerequisites.length} prereq
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Drawer (1 col) */}
        <div className="lg:col-span-1">
          {selectedNode && (
            <div className="sticky top-28 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block mb-1">
                  Concept Inspector
                </span>
                <h3 className="text-lg font-bold text-white mb-1">{selectedNode.label}</h3>
                <span className="text-xs text-slate-400">
                  {modulesMap[selectedNode.module] || "Module"}
                </span>
              </div>

              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                {selectedNode.description}
              </div>

              {/* Prerequisites list */}
              {selectedNode.prerequisites && selectedNode.prerequisites.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400 block">
                    Required Prerequisites:
                  </span>
                  <div className="space-y-1.5">
                    {selectedNode.prerequisites.map((prereqId) => {
                      const prereqNode = nodes.find((n) => n.id === prereqId);
                      if (!prereqNode) return null;
                      const status = getNodeStatus(prereqNode);
                      const styling = getStatusColor(status);

                      return (
                        <div
                          key={prereqId}
                          onClick={() => setSelectedNodeId(prereqId)}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs hover:border-slate-700 cursor-pointer"
                        >
                          <span className="text-slate-300">{prereqNode.label}</span>
                          <span className={`h-2 w-2 rounded-full ${styling.dot}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Status Update Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold text-slate-400 block">
                  Update Concept Status:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateNodeStatus(selectedNode.id, "mastered")}
                    className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 py-1.5 text-[11px] font-semibold text-emerald-400 hover:bg-emerald-500/20 cursor-pointer"
                  >
                    Mastered
                  </button>
                  <button
                    onClick={() => updateNodeStatus(selectedNode.id, "learning")}
                    className="rounded-lg border border-amber-500/30 bg-amber-500/10 py-1.5 text-[11px] font-semibold text-amber-400 hover:bg-amber-500/20 cursor-pointer"
                  >
                    Learning
                  </button>
                  <button
                    onClick={() => updateNodeStatus(selectedNode.id, "unvisited")}
                    className="rounded-lg border border-slate-700 bg-slate-800 py-1.5 text-[11px] font-semibold text-slate-400 hover:bg-slate-700 cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Read Full Notes Button */}
              <button
                onClick={() => {
                  // Find topic matching module
                  const targetModule = deck?.modules?.find((m) => m.id === selectedNode.module);
                  if (targetModule && targetModule.topics?.[0]) {
                    setSelectedTopicId(targetModule.topics[0].id);
                  }
                  setActiveTab("notes");
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>Open Related Topic Notes</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
