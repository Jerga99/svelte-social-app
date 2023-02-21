<script>
  import TaskList from "../../components/task-manager/TaskList.svelte";
  import { taskListStore } from "../../stores/tasks";

  export let data;
</script>

<div class="p-10 h-full flex-it">
  <div class="text-white text-2xl mb-6">
    {data.appName} - {data.content}
  </div>
  <button 
    on:click={taskListStore.addList}
    class="text-xl mb-3 text-white font-bold cursor-pointer hover:underline flex items-start"
  >
    + Add List
  </button>
  <div class="flex-it h-full flex-1">
    <div class="flex-it flex-row rounded-xl h-full">
      {#each $taskListStore as list, listIdx (list.id)}
        <TaskList 
          {list}
          {listIdx}
        />
      {/each}
    </div>
  </div>
</div>
