<script>
  import TaskList from "../../components/task-manager/TaskList.svelte";

  const taskList = [
    {id: "l-1", text: "List 1", items: [{id: "t-1", text: "Task 1"},{id: "t-2", text: "Task 2"},{id: "t-3", text: "Task 3"}]},
    {id: "l-2", text: "List 2", items: [{id: "t-4", text: "Task 4"},{id: "t-5", text: "Task 5"},{id: "t-6", text: "Task 6"}]},
    {id: "l-3", text: "List 3", items: [{id: "t-7", text: "Task 7"},{id: "t-8", text: "Task 8"},{id: "t-9", text: "Task 9"}]},
  ];

</script>

<div class="p-10 h-full">
  <div class="text-white text-2xl mb-6">Some List</div>
  <button class="text-xl mb-3 text-white font-bold cursor-pointer hover:underline flex items-start">
    + Add List
  </button>
  <div class="flex-it h-full">
    <div class="flex-it flex-row rounded-xl h-full">
      {#each taskList as list (list.id)}
        <TaskList 
          listName={list.text} 
          tasks={list.items}
        />
      {/each}
    </div>
  </div>
</div>
