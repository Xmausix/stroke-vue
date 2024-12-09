<template>
  <div
      class="relative overflow-hidden w-full h-full"
      @mousedown="startDrag"
      @mouseup="stopDrag"
      @mousemove="onDrag"
      @mouseleave="stopDrag"
  >
    <canvas
        ref="canvas"
        :width="canvasWidth"
        :height="canvasHeight"
        class="border border-gray-300"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const offsetX = ref(0);
    const offsetY = ref(0);
    const isDragging = ref(false);
    const startX = ref(0);
    const startY = ref(0);
    const cellSize = 20; // Size of each cell (half the original size)
    const canvasWidth = ref(window.innerWidth); // Set canvas width to window width
    const canvasHeight = ref(window.innerHeight); // Set canvas height to window height

    const drawGrid = () => {
      const ctx = canvas.value?.getContext('2d');
      if (!ctx) return;

      // Clear the canvas
      ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

      // Draw horizontal lines
      ctx.strokeStyle = '#ccc';
      for (let i = Math.floor(offsetY.value / cellSize); i <= Math.ceil((offsetY.value + canvasHeight.value) / cellSize); i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize - offsetY.value);
        ctx.lineTo(canvasWidth.value, i * cellSize - offsetY.value);
        ctx.stroke();
      }

      // Draw vertical lines
      for (let j = Math.floor(offsetX.value / cellSize); j <= Math.ceil((offsetX.value + canvasWidth.value) / cellSize); j++) {
        ctx.beginPath();
        ctx.moveTo(j * cellSize - offsetX.value, 0);
        ctx.lineTo(j * cellSize - offsetX.value, canvasHeight.value);
        ctx.stroke();
      }
    };

    const startDrag = (event: MouseEvent) => {
      isDragging.value = true;
      startX.value = event.clientX - offsetX.value;
      startY.value = event.clientY - offsetY.value;
    };

    const stopDrag = () => {
      isDragging.value = false;
    };

    const onDrag = (event: MouseEvent) => {
      if (isDragging.value) {
        offsetX.value = event.clientX - startX.value;
        offsetY.value = event.clientY - startY.value;
        drawGrid(); // Redraw the grid with the new offset
      }
    };

    const updateCanvasSize = () => {
      canvasWidth.value = window.innerWidth;
      canvasHeight.value = window.innerHeight;
      drawGrid(); // Redraw the grid when the canvas size changes
    };

    onMounted(() => {
      drawGrid();
      window.addEventListener('resize', updateCanvasSize); // Listen for window resize
    });

    onBeforeUnmount(() => {
      stopDrag(); // Clean up dragging state
      window.removeEventListener('resize', updateCanvasSize); // Clean up event listener
    });

    return {
      canvas,
      offsetX,
      offsetY,
      startDrag,
      stopDrag,
      onDrag,
      canvasWidth,
      canvasHeight,
    };
  },
});
</script>

<style scoped>
canvas {
  cursor: grab;
}
canvas:active {
  cursor: grabbing;
}
</style>

