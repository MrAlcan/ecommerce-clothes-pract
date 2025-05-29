<script lang="ts">

    type Product = {
        productId: string;
        productName: string;
        productAmount: number;
        productPrice: string;
        productDescription: string;
    };

    

    import { counterProductsToOrder, productList, loadProductsFromCookie, productIsOver } from '@/presentation/web/stores/index'

    import ProductInCar from "./ProductInCar.svelte";
    import { onMount } from 'svelte';

    import images from "@/presentation/assets/img/saco.jpg"
    const imagen_saco = images.src;

    

    let pathImg = imagen_saco;

    let products: readonly Product[] = [];

    $: products = $productList;



    /*products = [
        {
            name: "Camiseta Casual Para Hombre",
            description: "Talla: L | Color: Azul",
            price: 29.99,
            amount: 1,
            pathImg: imagen_saco,
        },
        {
            name: "Vestido de dama",
            description: "Talla: S | Color: Verde",
            price: 29.99,
            amount: 1,
            pathImg: imagen_saco,
        },
        {
            name: "Camiseta de Niño",
            description: "Talla: SM | Color: Rojo",
            price: 29.99,
            amount: 1,
            pathImg: imagen_saco,
        },
        {
            name: "Saco Formal para Hombre",
            description: "Talla: M | Color: Negro",
            price: 29.99,
            amount: 1,
            pathImg: imagen_saco,
        },
    ];*/




    
    //document.addEventListener("astro:page-load", function () {
        onMount(() => {

            loadProductsFromCookie();
            
            function setCookie(name: string, value: string, days: number) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Tiempo en milisegundos
                const expires = "expires=" + date.toUTCString();
                document.cookie = name + "=" + value + ";" + expires + ";path=/";
            }
            
            function getCookie(name: string) {
                const nameEQ = name + "=";
                const cookies = document.cookie.split(';');
            
                for (let i = 0; i < cookies.length; i++) {
                    let c = cookies[i].trim();
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length);
                    }
                }
            
                return null; // No se encontró la cookie
            }

            let productsCookie = getCookie('reservedProducts') ?? '[]';
            let productsList = JSON.parse(productsCookie) as Product[];

            console.log(productsList);

            products = productsList;

            console.log(products);

            counterProductsToOrder.set( productsList.length );

        
        
        const cartButton = document.getElementById(
            "cartButton",
        ) as HTMLButtonElement | null;
        const closeCartButton = document.getElementById(
            "closeCartButton",
        ) as HTMLButtonElement | null;
        const continueShoppingButton = document.getElementById(
            "continueShoppingButton",
        ) as HTMLButtonElement | null;
        const cartPanel = document.getElementById(
            "cartPanel",
        ) as HTMLElement | null;
        const overlay = document.getElementById(
            "overlay",
        ) as HTMLElement | null;
        const cartItems = document.getElementById(
            "cartItems",
        ) as HTMLElement | null;
        const emptyCart = document.getElementById(
            "emptyCart",
        ) as HTMLElement | null;
        const cartCount = document.getElementById(
            "cartCount",
        ) as HTMLElement | null;

        // Función para abrir el carrito
        function openCart(): void {
            if (cartPanel && overlay) {
                cartPanel.classList.remove("closed");
                cartPanel.classList.add("open");
                overlay.classList.remove("closed");
                overlay.classList.add("open");
                document.body.style.overflow = "hidden";
            }
        }

        // Función para cerrar el carrito
        function closeCart(): void {
            if (cartPanel && overlay) {
                cartPanel.classList.remove("open");
                cartPanel.classList.add("closed");
                overlay.classList.remove("open");
                overlay.classList.add("closed");
                document.body.style.overflow = "";
            }
        }

        // Función para mostrar carrito vacío
        function showEmptyCart(): void {
            if (!cartItems || !emptyCart || !cartCount) return;

            cartItems.classList.add("hidden");
            emptyCart.classList.remove("hidden");

            const summary = document.querySelector(
                ".border-t.p-4.bg-gray-50",
            ) as HTMLElement | null;
            if (summary) {
                summary.classList.add("hidden");
            }

            cartCount.textContent = "0";
            cartCount.classList.add("hidden");
        }

        // Función para mostrar carrito con productos
        function showCartWithItems(): void {
            if (!cartItems || !emptyCart || !cartCount) return;

            cartItems.classList.remove("hidden");
            emptyCart.classList.add("hidden");

            const summary = document.querySelector(
                ".border-t.p-4.bg-gray-50",
            ) as HTMLElement | null;
            if (summary) {
                summary.classList.remove("hidden");
            }

            updateCartCount();
        }

        // Función para actualizar contador de productos
        function updateCartCount(): void {
            if (!cartItems || !cartCount) return;

            const itemCount = cartItems.children.length;
            cartCount.textContent = itemCount.toString();

            if (itemCount === 0) {
                cartCount.classList.add("hidden");
            } else {
                cartCount.classList.remove("hidden");
            }
        }

        // Event listeners (validación por existencia)
        cartButton?.addEventListener("click", openCart);
        closeCartButton?.addEventListener("click", closeCart);
        continueShoppingButton?.addEventListener("click", closeCart);
        overlay?.addEventListener("click", closeCart);

        // Eliminar productos del carrito
        const deleteButtons = document.querySelectorAll(
            ".hover\\:text-red-500",
        ) as NodeListOf<HTMLElement>;
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const productItem = (this as HTMLElement).closest(
                    ".flex.items-center.space-x-4",
                ) as HTMLElement | null;
                productItem?.remove();

                if (cartItems && cartItems.children.length === 0) {
                    showEmptyCart();
                } else {
                    updateCartCount();
                }
            });
        });

        // Botón para vaciar carrito
        const summarySection = document.querySelector(
            ".border-t.p-4.bg-gray-50",
        ) as HTMLElement | null;
        if (summarySection && cartItems) {
            const emptyCartButton = document.createElement("button");
            emptyCartButton.textContent = "Vaciar Carrito (Demo)";
            emptyCartButton.className =
                "mt-4 w-full px-4 py-2 text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors";
            summarySection.appendChild(emptyCartButton);

            emptyCartButton.addEventListener("click", function () {
                while (cartItems.firstChild) {
                    cartItems.removeChild(cartItems.firstChild);
                }
                showEmptyCart();
            });

            // Botón para agregar producto (demo)
            const addProductButton = document.createElement("button");
            addProductButton.textContent = "Agregar Producto (Demo)";
            addProductButton.className =
                "mt-2 w-full px-4 py-2 text-sm font-medium rounded-md bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors";
            summarySection.appendChild(addProductButton);

            addProductButton.addEventListener("click", function () {
                showCartWithItems();

                if (cartItems.children.length > 0) {
                    const firstProduct = cartItems.children[0] as HTMLElement;
                    const newProduct = firstProduct.cloneNode(
                        true,
                    ) as HTMLElement;

                    const deleteButton = newProduct.querySelector(
                        ".hover\\:text-red-500",
                    ) as HTMLElement | null;
                    if (deleteButton) {
                        deleteButton.addEventListener("click", function () {
                            newProduct.remove();
                            if (cartItems.children.length === 0) {
                                showEmptyCart();
                            } else {
                                updateCartCount();
                            }
                        });
                    }

                    cartItems.appendChild(newProduct);
                    updateCartCount();
                }
            });
        }

        productIsOver.subscribe(value=>{
            
            console.log(`estado de carrito: ${value}`)
            if(value){
                openCart();
            } else {
                closeCart();
            }
        })
    });

    
    //});

</script>

<!-- Componente de Carrito de Compras -->
<div class="flex items-center">
    <!-- Botón del carrito -->
    <button
        id="cartButton"
        class="relative p-2 text-gray-600 hover:text-picton-blue-500 focus:outline-none focus:text-picton-blue-500 transition duration-150 ease-in-out"
    >
        <!-- Icono de carrito -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
        </svg>

        <!-- Contador de productos -->
        <span
            id="cartCount"
            class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-picton-blue-500 rounded-full"
            >{$counterProductsToOrder}</span
        >
    </button>

    <!-- Botón de usuario (opcional) -->
    <button
        class="ml-4 p-2 text-gray-600 hover:text-picton-blue-500 focus:outline-none focus:text-picton-blue-500 transition duration-150 ease-in-out"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
        </svg>
    </button>
</div>
<!-- Overlay para cuando el carrito está abierto -->
<div id="overlay" class="overlay closed fixed inset-0 bg-black z-40 opacity-50"></div>

<!-- Panel lateral del carrito -->
<div
    id="cartPanel"
    class="cart-panel closed fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto"
>
    <!-- Encabezado del carrito -->
    <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-lg font-semibold text-gray-800">Tu Carrito</h2>
        <button
            id="closeCartButton"
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    </div>

    <!-- Contenido del carrito -->
    <div id="cartContent" class="p-4">
        <!-- Lista de productos en el carrito -->
        <div id="cartItems" class="space-y-4">
            {#each products as { productName, productDescription, productAmount, productPrice, productId } (productName + productId) }
            <ProductInCar
                name={productName}
                description={productDescription}
                pathImg={pathImg}
                amount={productAmount}
                price={parseFloat(productPrice)}
            />
            {/each}
        </div>

        <!-- Estado de carrito vacío (oculto por defecto) -->
        <div id="emptyCart" class="py-8 text-center hidden">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 mx-auto text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
            </svg>
            <p class="mt-4 text-gray-500">Tu carrito está vacío</p>
            <button
                class="mt-4 px-4 py-2 text-sm font-medium rounded-md bg-picton-blue-500 text-white hover:bg-picton-blue-600 focus:outline-none focus:ring-2 focus:ring-picton-blue-500 focus:ring-offset-2 transition-colors"
            >
                Explorar Productos
            </button>
        </div>
    </div>

    <!-- Resumen y checkout -->
    <div class="border-t p-4 bg-gray-50">
        <!-- Subtotal -->
        <div class="flex justify-between py-2">
            <span class="text-sm text-gray-500">Subtotal</span>
            <span class="text-sm font-medium text-gray-900">$139.97</span>
        </div>

        <!-- Envío -->
        <div class="flex justify-between py-2">
            <span class="text-sm text-gray-500">Envío</span>
            <span class="text-sm font-medium text-gray-900">$5.00</span>
        </div>

        <!-- Total -->
        <div class="flex justify-between py-2 border-t mt-2">
            <span class="text-base font-medium text-gray-900">Total</span>
            <span class="text-base font-medium text-gray-900">$144.97</span>
        </div>

        <!-- Botón de checkout -->
        <button
            class="mt-4 w-full px-4 py-2 text-sm font-medium rounded-md bg-picton-blue-500 text-white hover:bg-picton-blue-600 focus:outline-none focus:ring-2 focus:ring-picton-blue-500 focus:ring-offset-2 transition-colors"
        >
            Proceder al Pago
        </button>

        <!-- Seguir comprando -->
        <button
            id="continueShoppingButton"
            class="mt-2 w-full px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-picton-blue-500 focus:ring-offset-2 transition-colors"
        >
            Seguir Comprando
        </button>
    </div>
</div>

<style>
    /* Animación para el panel lateral */
    .cart-panel {
        transition: transform 0.3s ease-in-out;
    }

    .cart-panel.open {
        transform: translateX(0);
    }

    .cart-panel.closed {
        transform: translateX(100%);
    }

    /* Overlay para cuando el carrito está abierto */
    .overlay {
        transition:
            opacity 0.3s ease-in-out,
            visibility 0.3s ease-in-out;
    }

    .overlay.open {
        opacity: 0.5;
        visibility: visible;
    }

    .overlay.closed {
        opacity: 0;
        visibility: hidden;
    }
</style>
