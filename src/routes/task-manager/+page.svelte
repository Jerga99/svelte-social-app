<script>
  import TaskList from "../../components/task-manager/TaskList.svelte";
  import { taskListStore } from "../../stores/tasks";
</script>

<div class="p-10 h-full">
  <div class="text-white text-2xl mb-6">Some List</div>
  <button class="text-xl mb-3 text-white font-bold cursor-pointer hover:underline flex items-start">
    + Add List
  </button>
  <div class="flex-it h-full">
    <div class="flex-it flex-row rounded-xl h-full">
      {#each $taskListStore as list (list.id)}
        <TaskList 
          listName={list.text} 
          tasks={list.items}
        />
      {/each}
    </div>
  </div>
</div>
