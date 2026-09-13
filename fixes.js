(function () {
      async function fixedCancelOwnWaitingFlip(flipId, button) {
          if (!flipId) return;

              const { data: authData, error: authError } =
                    await supabaseClient.auth.getUser();

                        const user = authData?.user;

                            if (authError || !user) {
                                  alert("You must be logged in to cancel your flip.");
                                        return;
                                            }

                                                if (button) {
                                                      button.disabled = true;
                                                            button.textContent = "Cancelling...";
                                                                }

                                                                    try {
                                                                          const { data: result, error } =
                                                                                  await supabaseClient.rpc("cancel_own_flip", {
                                                                                            p_flip_id: flipId
                                                                                                    });

                                                                                                          if (error) throw error;

                                                                                                                if (result !== true) {
                                                                                                                        throw new Error(
                                                                                                                                  "The flip could not be cancelled. It may no longer be waiting."
                                                                                                                                          );
                                                                                                                                                }

                                                                                                                                                      // Refresh the active flips.
                                                                                                                                                            if (typeof loadActiveFlips === "function") {
                                                                                                                                                                    await loadActiveFlips();
                                                                                                                                                                          }

                                                                                                                                                                                // Refresh Create Flip inventory if that function exists.
                                                                                                                                                                                      if (typeof loadCreateFlipInventory === "function") {
                                                                                                                                                                                              await loadCreateFlipInventory();
                                                                                                                                                                                                    }

                                                                                                                                                                                                          // Refresh normal inventory if available.
                                                                                                                                                                                                                if (typeof renderInventory === "function") {
                                                                                                                                                                                                                        await renderInventory();
                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                  } catch (error) {
                                                                                                                                                                                                                                        console.error("Cancel flip failed:", error);

                                                                                                                                                                                                                                              alert(
                                                                                                                                                                                                                                                      "Unable to cancel the flip.\n\n" +
                                                                                                                                                                                                                                                              (error?.message || "Unknown error")
                                                                                                                                                                                                                                                                    );

                                                                                                                                                                                                                                                                          if (button) {
                                                                                                                                                                                                                                                                                  button.disabled = false;
                                                                                                                                                                                                                                                                                          button.textContent = "Cancel Flip";
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                        // Capture the click before the old cancel handler gets a chance to run.
                                                                                                                                                                                                                                                                                                          document.addEventListener(
                                                                                                                                                                                                                                                                                                              "click",
                                                                                                                                                                                                                                                                                                                  function (event) {
                                                                                                                                                                                                                                                                                                                        const button = event.target.closest(
                                                                                                                                                                                                                                                                                                                                ".cancel-active-flip-button"
                                                                                                                                                                                                                                                                                                                                      );

                                                                                                                                                                                                                                                                                                                                            if (!button) return;

                                                                                                                                                                                                                                                                                                                                                  event.preventDefault();
                                                                                                                                                                                                                                                                                                                                                        event.stopPropagation();
                                                                                                                                                                                                                                                                                                                                                              event.stopImmediatePropagation();

                                                                                                                                                                                                                                                                                                                                                                    fixedCancelOwnWaitingFlip(
                                                                                                                                                                                                                                                                                                                                                                            button.dataset.flipId,
                                                                                                                                                                                                                                                                                                                                                                                    button
                                                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                                              },
                                                                                                                                                                                                                                                                                                                                                                                                  true
                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                    })();

