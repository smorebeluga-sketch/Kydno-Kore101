// =====================================
// KYDNO KORE FLIP ROW RENDERER
// =====================================

window.createFlipRow = function (flip, currentUser) {
  const itemCount = Array.isArray(flip.items) ? flip.items.length : 0;

  const sideName = flip.host_side === "tails" ? "TAILS" : "HEADS";

  const rangeMinimum = Math.round(Number(flip.total_value) * 0.95);

  const rangeMaximum = Math.round(Number(flip.total_value) * 1.05);

  return `
<div class="active-flip-card">
<div class="active-flip-player">
<div class="active-flip-avatar">
?
</div>
<div class="active-flip-player-info">
<div class="active-flip-name">
Player
</div>
<div class="active-flip-item-count">
${itemCount} Item${itemCount === 1 ? "" : "s"}
</div>
</div>
</div>
<div class="active-flip-value">
<span>Total</span>
<strong>
${Number(flip.total_value || 0).toLocaleString()}
</strong>
</div>
<div class="active-flip-side">
<div class="active-flip-coin">
${sideName}
</div>
</div>
<div class="active-flip-range">
<span>Join Range</span>
<strong>
${rangeMinimum.toLocaleString()}
-
${rangeMaximum.toLocaleString()}
</strong>
</div>
<div class="active-flip-action">
${
  currentUser && currentUser.id === flip.host_id
    ? `
<button
class="cancel-active-flip-button"
data-flip-id="${flip.id}">
Cancel Flip
</button>
`
    : `
<button
class="join-active-flip-button"
data-flip-id="${flip.id}"
data-flip-total-value="${flip.total_value}">
Join Flip
</button>
`
}
</div>
</div>
`;
};
