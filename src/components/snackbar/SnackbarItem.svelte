<script>
  import TiTimesOutline from 'svelte-icons/ti/TiTimesOutline.svelte'
  
  const type = "error";

  let bgColor;

  if (type === "success") {
    bgColor = "bg-blue-400";
  } else if (type === "error") {
    bgColor = "bg-red-700";
  } else {
    bgColor = "bg-yellow-700";
  }
</script>

<div
  class="{bgColor} min-w-68 text-white flex-it font-bold rounded-md md:max-w-xs w-full text-sm shadow-md"
> 
  <div class="flex-it flex-row-reverse p-1">
    <button class="text-xl rounded-full">
      <div class="icon">
        <TiTimesOutline />
      </div>
    </button>
  </div>
  <div class="flex-it px-2 pb-3">
    Hello World
  </div>
  <div 
    style="width: {100}%"
    class="bg-black opacity-40 text-right h-2"
  >
  </div>
</div>
