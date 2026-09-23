// ========================================
// KYDNO KORE - COINFLIP JOIN SYSTEM
// ========================================

async function joinKydnoFlip(flipId, selectedItemIds) {
        alert("COINFLIP FUNCTION REACHED");
        console.log("JOIN COINFLIP FUNCTION CALLED", flipId, selectedItemIds);
                            if (!flipId) {
                                    alert("Flip ID is missing.");
                                            return null;
                                                }

                                                    if (!Array.isArray(selectedItemIds) || selectedItemIds.length === 0) {
                                                            alert("Please select your items first.");
                                                                    return null;
                                                                        }

                                                                            try {


                                                                                    alert("ABOUT TO CALL SUPABASE");
                                                                                const {
                                                                                                data,
                                                                                                            error
                                                                                                                    } = await supabaseClient.rpc("join_coinflip", {
                                                                                                                                p_flip_id: flipId,
                                                                                                                                            p_joiner_item_ids: selectedItemIds.map(Number)
                                                                                                                                                    });

                                                                                                                                                            if (error) {
                                                                                                                                                                        console.error("Coinflip join error:", error);
                                                                                                                                                                                    alert(error.message || "Unable to join this flip.");
                                                                                                                                                                                                return null;
                                                                                                                                                                                                        }

                                                                                                                                                                                                                const result = Array.isArray(data) ? data[0] : data;

                                                                                                                                                                                                                        if (!result || result.success !== true) {
                                                                                                                                                                                                                                    alert("Unable to join this flip.");
                                                                                                                                                                                                                                                return null;
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                console.log("Coinflip resolved:", result);

                                                                                                                                                                                                                                                                        return result;

                                                                                                                                                                                                                                                                            } catch (error) {

                                                                                                                                                                                                                                                                                    console.error("Unexpected coinflip error:", error);
                                                                                                                                                                                                                                                                                            alert("Something went wrong while joining the flip.");
                                                                                                                                                                                                                                                                                                    return null;

                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                        }
