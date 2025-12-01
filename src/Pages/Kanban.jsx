import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialData = {
  todo: [
    { id: '1', content: 'Design Dashboard' },
    { id: '2', content: 'Fix Auth Bug' },
  ],
  inProgress: [
    { id: '3', content: 'Develop API' },
  ],
  done: [
    { id: '4', content: 'Setup Project' },
  ]
};

const Kanban = () => {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // Move within same list
    if (source.droppableId === destination.droppableId) {
      const list = Array.from(columns[source.droppableId]);
      const [removed] = list.splice(source.index, 1);
      list.splice(destination.index, 0, removed);
      
      setColumns({ ...columns, [source.droppableId]: list });
    } else {
      // Move between lists
      const sourceList = Array.from(columns[source.droppableId]);
      const destList = Array.from(columns[destination.droppableId]);
      const [removed] = sourceList.splice(source.index, 1);
      destList.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList
      });
    }
  };

  return (
    <div className="h-full">
      <h2 className="text-xl font-bold mb-6 dark:text-white">Project Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, items]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl min-h-[500px]"
                >
                  <h3 className="font-bold mb-4 uppercase text-gray-500 dark:text-gray-400 text-sm">
                    {columnId}
                  </h3>
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white dark:bg-gray-700 p-4 mb-3 rounded-lg shadow-sm dark:text-white"
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Kanban;