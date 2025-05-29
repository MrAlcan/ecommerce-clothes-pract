<script lang="ts">

    export let productId: string;
    export let pathImg: string;
    export let description: string;
    export let name: string;
    export let price: number;



    import { counterProductsToOrder, productList, productIsOver } from '@/presentation/web/stores/index';
    import { onMount } from 'svelte';

    //document.addEventListener('astro:after-swap', () => {

    onMount(()=>{

        type Product = {
            productId: string;
            productName: string;
            productAmount: number;
            productPrice: string;
            productDescription: string;
        };

        const listeners: { button: HTMLButtonElement, handler: EventListener }[] = [];

        const buttonsAddProduct = document.querySelectorAll('.button-add-product') as NodeListOf<HTMLButtonElement>;

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

        /*const buttonAddProductSvelte = document.querySelector('.button-add-product') as HTMLButtonElement;

        buttonAddProductSvelte.addEventListener('click', () => {
            const productId = buttonAddProductSvelte.dataset.id ?? '1';
                const productName = buttonAddProductSvelte.dataset.name ?? 'S/N';
                const productPrice = buttonAddProductSvelte.dataset.price ?? '0.00';
                const productDescription = buttonAddProductSvelte.dataset.description ?? 'S/N';
                const productAmount = 1;
                
                console.log(' Presionando del boton de agregar al carrito ');
    
                const reservedProducts = getCookie('reservedProducts');
    
                console.log(reservedProducts);
    
                if( !reservedProducts ){
                    const productSelected = [{
                        productId,
                        productName,
                        productAmount,
                        productPrice,
                        productDescription
                    }];

                    setCookie('reservedProducts', JSON.stringify(productSelected), 1)

                    counterProductsToOrder.set( 1 );
                    productList.set( productSelected )
    
                } else {
                    const arrayProducts = JSON.parse(reservedProducts) as Product[];
    
                    const existProduct = arrayProducts.find( product => product.productId == productId ) as Product;
    
                    if ( !existProduct ) {
                        const productSelected = {
                            productId,
                            productName,
                            productAmount,
                            productPrice,
                            productDescription
                        };
    
                        arrayProducts.push(productSelected)
    
                        setCookie('reservedProducts', JSON.stringify(arrayProducts), 1)

                        counterProductsToOrder.set( arrayProducts.length );

                        productList.set( arrayProducts );
    
                    } else {
    
                        const newArrayProducts = arrayProducts.filter(product => product.productId !== productId);
                        const productSelected = {
                            productId,
                            productName,
                            productAmount: existProduct.productAmount + productAmount,
                            productPrice,
                            productDescription
                        };
    
                        newArrayProducts.push(productSelected);
    
                        setCookie('reservedProducts', JSON.stringify(newArrayProducts), 1)
                        counterProductsToOrder.set( newArrayProducts.length );

                        productList.set( newArrayProducts );
    
                    }
    
                }
        });*/

        buttonsAddProduct.forEach( buttonAddProduct => {

            const handlerAddProduct: EventListener = () => {
                const productId = buttonAddProduct.dataset.id ?? '1';
                const productName = buttonAddProduct.dataset.name ?? 'S/N';
                const productPrice = buttonAddProduct.dataset.price ?? '0.00';
                const productDescription = buttonAddProduct.dataset.description ?? 'S/N';
                const productAmount = 1;
                
                console.log(' Presionando del boton de agregar al carrito ');
    
                const reservedProducts = getCookie('reservedProducts');
    
                console.log(reservedProducts);
    
                if( !reservedProducts ){
                    const productSelected = [{
                        productId,
                        productName,
                        productAmount,
                        productPrice,
                        productDescription
                    }];

                    setCookie('reservedProducts', JSON.stringify(productSelected), 1)

                    counterProductsToOrder.set( 1 );
                    productList.set( productSelected )
    
                } else {
                    const arrayProducts = JSON.parse(reservedProducts) as Product[];
    
                    const existProduct = arrayProducts.find( product => product.productId == productId ) as Product;
    
                    if ( !existProduct ) {
                        const productSelected = {
                            productId,
                            productName,
                            productAmount,
                            productPrice,
                            productDescription
                        };
    
                        arrayProducts.push(productSelected)
    
                        setCookie('reservedProducts', JSON.stringify(arrayProducts), 1)

                        counterProductsToOrder.set( arrayProducts.length );

                        productList.set( arrayProducts );
    
                    } else {
    
                        const newArrayProducts = arrayProducts.filter(product => product.productId !== productId);
                        const productSelected = {
                            productId,
                            productName,
                            productAmount: existProduct.productAmount + productAmount,
                            productPrice,
                            productDescription
                        };
    
                        newArrayProducts.push(productSelected);
    
                        setCookie('reservedProducts', JSON.stringify(newArrayProducts), 1)
                        counterProductsToOrder.set( newArrayProducts.length );

                        productList.set( newArrayProducts );
    
                    }
    
                }
            };

            buttonAddProduct.addEventListener('click', handlerAddProduct);

            listeners.push({ button: buttonAddProduct, handler: handlerAddProduct });




            /*buttonAddProduct.addEventListener('click', () => {
                const productId = buttonAddProduct.dataset.id ?? '1';
                const productName = buttonAddProduct.dataset.name ?? 'S/N';
                const productPrice = buttonAddProduct.dataset.price ?? '0.00';
                const productDescription = buttonAddProduct.dataset.description ?? 'S/N';
                const productAmount = 1;
                
                console.log(' Presionando del boton de agregar al carrito ');
    
                const reservedProducts = getCookie('reservedProducts');
    
                console.log(reservedProducts);
    
                if( !reservedProducts ){
                    const productSelected = [{
                        productId,
                        productName,
                        productAmount,
                        productPrice,
                        productDescription
                    }];

                    setCookie('reservedProducts', JSON.stringify(productSelected), 1)

                    counterProductsToOrder.set( 1 );
                    productList.set( productSelected )
    
                } else {
                    const arrayProducts = JSON.parse(reservedProducts) as Product[];
    
                    const existProduct = arrayProducts.find( product => product.productId == productId ) as Product;
    
                    if ( !existProduct ) {
                        const productSelected = {
                            productId,
                            productName,
                            productAmount,
                            productPrice,
                            productDescription
                        };
    
                        arrayProducts.push(productSelected)
    
                        setCookie('reservedProducts', JSON.stringify(arrayProducts), 1)

                        counterProductsToOrder.set( arrayProducts.length );

                        productList.set( arrayProducts );
    
                    } else {
    
                        const newArrayProducts = arrayProducts.filter(product => product.productId !== productId);
                        const productSelected = {
                            productId,
                            productName,
                            productAmount: existProduct.productAmount + productAmount,
                            productPrice,
                            productDescription
                        };
    
                        newArrayProducts.push(productSelected);
    
                        setCookie('reservedProducts', JSON.stringify(newArrayProducts), 1)
                        counterProductsToOrder.set( newArrayProducts.length );

                        productList.set( newArrayProducts );
    
                    }
    
                }
    
            });*/
        } );

        return () => {
            listeners.forEach(({ button, handler }) => {
                button.removeEventListener('click', handler);
            });
        };


        
        
        /*function handleDragOver( e: any, index: any ) {
            e.preventDefault(); // necesario para permitir drop
            if (index !== draggingIndex) {
                const reordered = [...items];
                const [moved] = reordered.splice(draggingIndex, 1);
                reordered.splice(index, 0, moved);
                items = reordered;
                draggingIndex = index;
                }
                }*/
    })
            
    let draggingIndex: any = null;

    function handleDragStart( event: any ) {
        //draggingIndex = index;
        event.dataTransfer.effectAllowed = 'move';
        productIsOver.set(true);

        const informationForSend = {
            name: name,
            description: description,
            pathImg: pathImg,
            price: price,
            amount: 1
        }

    }

    function handleDragOver( event: any ) {
        event.preventDefault(); // necesario para permitir drop
        productIsOver.set(false);
    }


</script>

<div class="group" draggable="true" on:dragstart={handleDragStart} on:dragend={handleDragOver}>
    <div
        class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
    >
        <img
            src={pathImg}
            alt={description}
            class="w-full h-full object-center object-cover group-hover:opacity-75"
        />
    </div>
    <h3 class="mt-4 text-sm text-gray-700">{name}</h3>
    <p class="mt-1 text-lg font-medium text-gray-900">${price}</p>
    <button
        id="button-add-product"
        class="mt-2 w-full bg-picton-blue-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-picton-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-picton-blue-500 button-add-product"
        data-name={ name }
        data-price={ price }
        data-id={ productId ?? '1' }
        data-description={ description }
    >
        Añadir al carrito
    </button>
</div>