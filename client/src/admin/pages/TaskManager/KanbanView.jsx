import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const KanbanView = ({ groupedTasks, onEdit, onDelete, openModal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <Droppable droppableId={status} key={status}>
          {(provided) => (
            <div
              className="bg-white rounded-xl shadow p-4 min-h-[300px]"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2 className="text-lg font-semibold text-indigo-600 mb-4">
                {status}
              </h2>
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <TaskCard
                      task={task}
                      innerRef={provided.innerRef}
                      dragHandleProps={provided.dragHandleProps}
                      draggableProps={provided.draggableProps}
                      onEdit={() => {
                        onEdit(task);
                        openModal();
                      }}
                      onDelete={() => onDelete(task._id)}
                    />
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};

export default KanbanView;
