// Kydno Kore - Kash System

window.kydnoKash = {
    balance: 0,

        async loadBalance() {
                try {
                            const { data: { user }, error: authError } =
                                            await supabaseClient.auth.getUser();

                                                        if (authError || !user) {
                                                                        console.log("No logged-in user found for Kash.");
                                                                                        return 0;
                                                                                                    }

                                                                                                                const { data, error } = await supabaseClient
                                                                                                                                .from("profiles")
                                                                                                                                                .select("kash")
                                                                                                                                                                .eq("id", user.id)
                                                                                                                                                                                .single();

                                                                                                                                                                                            if (error) {
                                                                                                                                                                                                            console.error("Unable to load Kash:", error);
                                                                                                                                                                                                                            return 0;
                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                    this.balance = Number(data.kash || 0);

                                                                                                                                                                                                                                                                const balanceElement = document.getElementById("kash-balance");

                                                                                                                                                                                                                                                                            if (balanceElement) {
                                                                                                                                                                                                                                                                                            balanceElement.textContent =
                                                                                                                                                                                                                                                                                                                this.balance.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 }).toLowerCase();
                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                        console.log("Kash balance:", this.balance);

                                                                                                                                                                                                                                                                                                                                                    return this.balance;

                                                                                                                                                                                                                                                                                                                                                            } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                        console.error("Kash system error:", error);
                                                                                                                                                                                                                                                                                                                                                                                    return 0;
                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                                                                                                                                                                                document.addEventListener("DOMContentLoaded", () => {
                                                                                                                                                                                                                                                                                                                                                                                                    window.kydnoKash.loadBalance();
                                                                                                                                                                                                                                                                                                                                                                                                    });
// ================================
// Kydno Kore - Admin Kash Controls
// ================================

window.kydnoAdminKash = {

    async adjustKash(targetUserId, amount) {
            try {
                        const { data, error } = await supabaseClient.rpc(
                                        "admin_adjust_kash",
                                                        {
                                                                            target_user_id: targetUserId,
                                                                                                amount: amount
                                                                                                                }
                                                                                                                            );

                                                                                                                                        if (error) {
                                                                                                                                                        console.error("Admin Kash error:", error);
                                                                                                                                                                        alert(error.message || "Unable to adjust Kash.");
                                                                                                                                                                                        return null;
                                                                                                                                                                                                    }

                                                                                                                                                                                                                console.log("New Kash balance:", data);

                                                                                                                                                                                                                            return Number(data);

                                                                                                                                                                                                                                    } catch (error) {
                                                                                                                                                                                                                                                console.error("Admin Kash system error:", error);
                                                                                                                                                                                                                                                            alert("Unable to adjust Kash.");
                                                                                                                                                                                                                                                                        return null;
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                    },

                                                                                                                                                                                                                                                                                        async giveKash(targetUserId, amount) {
                                                                                                                                                                                                                                                                                                return await this.adjustKash(
                                                                                                                                                                                                                                                                                                            targetUserId,
                                                                                                                                                                                                                                                                                                                        Math.abs(Number(amount))
                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                    },

                                                                                                                                                                                                                                                                                                                                        async removeKash(targetUserId, amount) {
                                                                                                                                                                                                                                                                                                                                                return await this.adjustKash(
                                                                                                                                                                                                                                                                                                                                                            targetUserId,
                                                                                                                                                                                                                                                                                                                                                                        -Math.abs(Number(amount))
                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                    };