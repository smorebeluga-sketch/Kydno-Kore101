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
// ================================
// Kydno Kore - Shop Sell View
// ================================

const shopSellButton = document.getElementById("shop-sell-button");
const shopBuyButton = document.getElementById("shop-buy-button");
const shopSellView = document.getElementById("shop-sell-view");

if (shopSellButton && shopSellView) {

    shopSellButton.addEventListener("click", () => {

            shopSellView.classList.remove("hidden");

                    if (shopBuyButton) {
                                shopBuyButton.classList.remove("active");
                                        }

                                                shopSellButton.classList.add("active");

                                                    });

                                                    }
// ================================
// Kydno Kore - Shop Inventory Setup
// ================================

window.kydnoShop = {

    selectedItems: [],

        clearSelection() {
                this.selectedItems = [];

                        const count = document.getElementById("shop-selected-count");
                                const total = document.getElementById("shop-sell-total");
                                        const sellButton = document.getElementById("shop-sell-selected");

                                                if (count) {
                                                            count.textContent = "0 items";
                                                                    }

                                                                            if (total) {
                                                                                        total.textContent = "0";
                                                                                                }

                                                                                                        if (sellButton) {
                                                                                                                    sellButton.disabled = true;
                                                                                                                            }

                                                                                                                                    document
                                                                                                                                                .querySelectorAll(".shop-inventory-item.selected")
                                                                                                                                                            .forEach(item => {
                                                                                                                                                                            item.classList.remove("selected");
                                                                                                                                                                                        });
                                                                                                                                                                                            },

                                                                                                                                                                                                updateSummary() {

                                                                                                                                                                                                        const count = document.getElementById("shop-selected-count");
                                                                                                                                                                                                                const total = document.getElementById("shop-sell-total");
                                                                                                                                                                                                                        const sellButton = document.getElementById("shop-sell-selected");

                                                                                                                                                                                                                                let totalValue = 0;

                                                                                                                                                                                                                                        this.selectedItems.forEach(item => {
                                                                                                                                                                                                                                                    totalValue += Number(item.value || 0) * 0.90;
                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                    if (count) {
                                                                                                                                                                                                                                                                                count.textContent =
                                                                                                                                                                                                                                                                                                `${this.selectedItems.length} ${
                                                                                                                                                                                                                                                                                                                    this.selectedItems.length === 1 ? "item" : "items"
                                                                                                                                                                                                                                                                                                                                    }`;
                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                    if (total) {
                                                                                                                                                                                                                                                                                                                                                                total.textContent =
                                                                                                                                                                                                                                                                                                                                                                                Math.floor(totalValue).toLocaleString("en-US");
                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                if (sellButton) {
                                                                                                                                                                                                                                                                                                                                                                                                            sellButton.disabled =
                                                                                                                                                                                                                                                                                                                                                                                                                            this.selectedItems.length === 0;
                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                        },

                                                                                                                                                                                                                                                                                                                                                                                                                                            selectItem(itemElement, itemData) {

                                                                                                                                                                                                                                                                                                                                                                                                                                                    const existingIndex = this.selectedItems.findIndex(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                item => item.id === itemData.id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        );

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if (existingIndex !== -1) {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            this.selectedItems.splice(existingIndex, 1);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        itemElement.classList.remove("selected");

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                } else {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            this.selectedItems.push(itemData);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        itemElement.classList.add("selected");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        this.updateSummary();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            };