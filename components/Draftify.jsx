"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EditBlock from "./DraftifyProComponents/EditBlock";
import Options from "./DraftifyProComponents/Options";
import OutputBlock from "./DraftifyProComponents/OutputBlock";
import ToolBar from "./DraftifyProComponents/ToolBar";
import Grabber from "./DraftifyProComponents/Grabber";
import BackGround from "./DraftifyProComponents/Background";

import { useDraftify } from "../hooks/DraftifyHooks/useDraftify";
import { useGenerateGrid } from "../hooks/DraftifyHooks/BackgroundHooks/backGroundEffects";

export default function Draftify({ data }) {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState("editor");
  const [gridDots, setGridDots] = useState([]);
  const [draft, setDraft] = useState(data);

  const {
    blocksData,
    handleClick,
    handleChange,
    handleTableChange,
    handleDelete,
    onDropHandler,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    containerVariants,
    itemVariants,
    transitions,
    whileHover,
  } = useDraftify(draft);

  useEffect(() => {
    setMounted(true);
    setDraft([]);
  }, []);

  useGenerateGrid(setGridDots);

  if (!mounted) return null;

  return (
    <>
      <BackGround gridDots={gridDots} />
      <div className="flex flex-col md:gap-[10px] gap-[20px] w-full md:w-full min-h-screen h-fit border border-(--primary-blue) rounded-2xl p-2 md:p-5 bg-white">
        <ToolBar view={view} setView={setView} blocksData={blocksData} />

        {view === "editor" && (
          <>
            <Options handleClick={handleClick} />
            <div
              className="flex-1 border border-(--primary-blue) rounded-2xl md:p-5 p-[10px_0]"
              onSubmit={(e) => e.preventDefault()}
            >
              <motion.div
                className="grid gap-[10px]"
                variants={containerVariants}
                animate="show"
                exit="hidden"
              >
                <AnimatePresence>
                  {blocksData.map((b, index) => (
                    <motion.div
                      key={b.id}
                      layout
                      variants={itemVariants}
                      transition={transitions}
                      whileHover={whileHover}
                      draggable
                      onDragStart={(e) => onDragStart(e, index)}
                      onDragEnd={(e) => onDragEnd(e)}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={(e) => onDragEnter(e)}
                      onDragLeave={(e) => onDragLeave(e)}
                      onDrop={(e) => onDropHandler(e, index)}
                      className="flex items-center gap-[5px] rounded-md p-[5px] transition-colors"
                    >
                      <Grabber />
                      <EditBlock
                        block={b}
                        onChange={handleChange}
                        onTableChange={handleTableChange}
                      />

                      <FontAwesomeIcon
                        icon={["fas", "trash"]}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleDelete(b.id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}

        {view === "preview" && (
          <div
            className="grid gap-[10px] border-t border-b border-(--primary-blue) rounded-2xl p-3 md:p-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <OutputBlock blocksData={blocksData} />
          </div>
        )}
      </div>
    </>
  );
}
