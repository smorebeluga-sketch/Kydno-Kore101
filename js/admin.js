// =====================================
// ADMIN — CANCEL ANY WAITING FLIP
// =====================================

async function adminCancelWaitingFlip(flipId, button) {
    if (!flipId) return;

        const isAdmin = localStorage.getItem("kydnoIsAdmin") === "true";

            if (!isAdmin) {
                    alert("Admin access required.");
                            return;
                                }

                                    const confirmed = confirm(
                                            "Are you sure you want to cancel this flip?"
                                                );

                                                    if (!confirmed) return;

                                                        button.disabled = true;
                                                            button.textContent = "Cancelling...";

                                                                const { data, error } = await supabaseClient.rpc(
                                                                        "admin_cancel_flip",
                                                                                {
                                                                                            p_flip_id: flipId
                                                                                                    }
                                                                                                        );

                                                                                                            if (error) {
                                                                                                                    console.error("Admin cancel flip error:", error);
                                                                                                                            alert("Unable to cancel flip:\n\n" + error.message);

                                                                                                                                    button.disabled = false;
                                                                                                                                            button.textContent = "Cancel Flip";
                                                                                                                                                    return;
                                                                                                                                                        }

                                                                                                                                                            if (data !== true) {
                                                                                                                                                                    alert("The flip could not be cancelled.");

                                                                                                                                                                            button.disabled = false;
                                                                                                                                                                                    button.textContent = "Cancel Flip";
                                                                                                                                                                                            return;
                                                                                                                                                                                                }

                                                                                                                                                                                                    // Refresh the active flip list.
                                                                                                                                                                                                        if (typeof loadActiveFlips === "function") {
                                                                                                                                                                                                                await loadActiveFlips();
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                    }


                                                                                                                                                                                                                    // Add an admin cancel button to every waiting flip.
                                                                                                                                                                                                                    function addAdminCancelButtons() {
                                                                                                                                                                                                                        if (localStorage.getItem("kydnoIsAdmin") !== "true") return;

                                                                                                                                                                                                                            const flipCards = document.querySelectorAll(".active-flip-card");

                                                                                                                                                                                                                                flipCards.forEach((card) => {
                                                                                                                                                                                                                                        if (card.querySelector(".admin-cancel-flip-button")) return;

                                                                                                                                                                                                                                                const joinButton = card.querySelector(".join-active-flip-button");
                                                                                                                                                                                                                                                        const existingCancelButton = card.querySelector(".cancel-active-flip-button");

                                                                                                                                                                                                                                                                const flipId =
                                                                                                                                                                                                                                                                            joinButton?.dataset.flipId ||
                                                                                                                                                                                                                                                                                        existingCancelButton?.dataset.flipId;

                                                                                                                                                                                                                                                                                                if (!flipId) return;

                                                                                                                                                                                                                                                                                                        const button = document.createElement("button");

                                                                                                                                                                                                                                                                                                                button.type = "button";
                                                                                                                                                                                                                                                                                                                        button.className = "admin-cancel-flip-button";
                                                                                                                                                                                                                                                                                                                                button.textContent = "Cancel Flip";
                                                                                                                                                                                                                                                                                                                                        button.dataset.flipId = flipId;

                                                                                                                                                                                                                                                                                                                                                button.addEventListener("click", (event) => {
                                                                                                                                                                                                                                                                                                                                                            event.preventDefault();
                                                                                                                                                                                                                                                                                                                                                                        event.stopPropagation();

                                                                                                                                                                                                                                                                                                                                                                                    adminCancelWaitingFlip(flipId, button);
                                                                                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                                                                                    card.appendChild(button);
                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                        }


                                                                                                                                                                                                                                                                                                                                                                                                        // Watch the active-flip list because loadActiveFlips()
                                                                                                                                                                                                                                                                                                                                                                                                        // rebuilds the cards dynamically.
                                                                                                                                                                                                                                                                                                                                                                                                        const adminFlipObserver = new MutationObserver(() => {
                                                                                                                                                                                                                                                                                                                                                                                                            addAdminCancelButtons();
                                                                                                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                                                                                            const adminFlipList = document.getElementById("active-flips-list");

                                                                                                                                                                                                                                                                                                                                                                                                            if (adminFlipList) {
                                                                                                                                                                                                                                                                                                                                                                                                                adminFlipObserver.observe(adminFlipList, {
                                                                                                                                                                                                                                                                                                                                                                                                                        childList: true,
                                                                                                                                                                                                                                                                                                                                                                                                                                subtree: true
                                                                                                                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                                                                                                                        addAdminCancelButtons();
                                                                                                                                                                                                                                                                                                                                                                                                                                        }
