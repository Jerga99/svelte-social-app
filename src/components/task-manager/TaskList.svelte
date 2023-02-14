<script>
  import TaskItem from "./TaskItem.svelte";

  export let listName;
  export let tasks;
</script>

<div class="flex-it h-full w-80 max-w-sm min-h-full m-2 my-0">
  <div class="bg-slate-400 flex-it rounded-xl max-h-full border-2 border-gray-500">
    <div class="flex-it m-3">
      <div class="flex-it flex-row">
        <div class="text-xl text-left font-bold mr-2">{listName}</div>
        <div class="flex hover:text-red-600 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="overflow-x-hidden overflow-y-auto with-scrollbar p-2">
      {#each tasks as task (task.id)}
        <TaskItem taskDescription={task.text} />
      {/each}
    </div>
    <button class="underline flex p-2"> + Add Task </button>
  </div>
</div>
