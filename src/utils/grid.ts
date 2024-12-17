import type { Point } from '../types/drawing'

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  offset: Point,
  scale: number,
  width: number,
  height: number
): void {
  const gridSize = 50 // Base grid size in pixels
  const scaledGridSize = gridSize * scale

  // Calculate grid boundaries
  const startX = Math.floor(-offset.x / scaledGridSize) * scaledGridSize
  const startY = Math.floor(-offset.y / scaledGridSize) * scaledGridSize
  const endX = width
  const endY = height

  ctx.save()
  ctx.strokeStyle = '#444444'
  ctx.lineWidth = 0.5
  ctx.beginPath()

  // Draw vertical lines
  for (let x = startX; x < endX; x += scaledGridSize) {
    ctx.moveTo(x, startY)
    ctx.lineTo(x, endY)
  }

  // Draw horizontal lines
  for (let y = startY; y < endY; y += scaledGridSize) {
    ctx.moveTo(startX, y)
    ctx.lineTo(endX, y)
  }

  ctx.stroke()

  // Draw coordinates
  ctx.font = '12px monospace'
  ctx.fillStyle = '#666666'
  ctx.textAlign = 'center'

  // Draw X coordinates
  for (let x = startX; x < endX; x += scaledGridSize) {
    const coordX = Math.round(x / scaledGridSize)
    ctx.fillText(coordX.toString(), x, 15)
  }

  // Draw Y coordinates
  ctx.textAlign = 'right'
  for (let y = startY; y < endY; y += scaledGridSize) {
    const coordY = Math.round(y / scaledGridSize)
    ctx.fillText(coordY.toString(), 25, y + 4)
  }

  ctx.restore()
}