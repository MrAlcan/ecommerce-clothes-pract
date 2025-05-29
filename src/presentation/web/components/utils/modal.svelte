<script lang="ts">

  import ModalIcon from '@/presentation/web/components/utils/modalIcon.svelte'
    import { onMount } from 'svelte';

  export let textButton: string = 'Modal';
  export let modalId: string = 'ButtonId';
  export let typeModal: 'loading' | 'error' | 'warning' | 'information' | 'success' | 'confirmation' = 'information';
  export let modalTitle: string = 'Information';
  export let modalSubtitle: string = 'Are you sure?';
  export let modalText: string = 'The Information is here';
  export let textButtonAccept: string = 'Accept';
  export let textButtonCancel: string = 'Cancel';


  const statusClassButtonMap: Record<typeof typeModal, string> = {
    loading: "bg-purple-500 hover:bg-purple-600 ",
    error: "bg-red-500 hover:bg-red-600 ",
    warning: "bg-yellow-500 hover:bg-yellow-600",
    information: "bg-picton-blue-500 hover:bg-picton-blue-600",
    success: "bg-green-500 hover:bg-green-600 ",
    confirmation: "bg-indigo-500 hover:bg-indigo-600",
  };

  const statusClassModalMap: Record<typeof typeModal, string> = {
    loading: "bg-purple-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    information: "bg-picton-blue-500 ",
    success: "bg-green-500 ",
    confirmation: "bg-indigo-500",
  };

  let buttonId = `button${modalId}`;
  let modalTextId = `modal${modalId}`

  $: statusClassButton = statusClassButtonMap[typeModal] || statusClassButtonMap['information'];
  $: statusClassModal = statusClassModalMap[typeModal] || statusClassModalMap['information'];


    /*
    Loading Mode
Error Mode
Warning Mode
Information Mode
Success Mode
Confirmation Mode
    */

    onMount(()=>{
      // Función para abrir un modal
    function openModal(modalId: string) {
      const modal = document.getElementById(modalId) as HTMLDivElement;
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevenir scroll
      
      // Añadir la clase para la animación de entrada
      const modalContent = modal.querySelector('.modal-content') as HTMLDivElement;
      modalContent.classList.add('animate-fade-in');
    }
    
    // Función para cerrar un modal
    function closeModal(modalId: string) {
      const modal = document.getElementById(modalId) as HTMLDivElement;
      
      // Añadir clase para animación de salida
      modal.classList.add('fade-out');
      
      // Esperar a que termine la animación antes de ocultar
      setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = ""; // Restaurar scroll
        modal.classList.remove('fade-out');
      }, 300);
    }
    document.getElementById(buttonId)?.addEventListener('click', () => openModal(modalTextId));
    })


    /*  // MAS SCRIPTS
    // Configurar botones para cerrar modales
    const modals = ['errorModal', 'warningModal', 'infoModal', 'successModal', 'confirmModal', 'loadingModal'];
    
    modals.forEach(modalId => {
      const modal = document.getElementById(modalId);
      
      // Cerrar al hacer clic en el botón X
      const closeButtons = modal.querySelectorAll('.modal-close');
      closeButtons.forEach(button => {
        button.addEventListener('click', () => closeModal(modalId));
      });
      
      // Cerrar al hacer clic fuera del modal
      modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          closeModal(modalId);
        }
      });
    });
    
    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        modals.forEach(modalId => {
          const modal = document.getElementById(modalId);
          if (modal.style.display === 'block') {
            closeModal(modalId);
          }
        });
      }
    });
    */


</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    body {
      font-family: 'Poppins', sans-serif;
    }
    
    /* Estilos para los modales */
    .modal {
      display: none;
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.3s ease;
    }
    
    .modal-content {
      animation: fadeIn 0.3s;
    }
    
    @keyframes fadeIn {
      from {opacity: 0; transform: translateY(-20px);}
      to {opacity: 1; transform: translateY(0);}
    }
    
    @keyframes fadeOut {
      from {opacity: 1; transform: translateY(0);}
      to {opacity: 0; transform: translateY(-20px);}
    }
    
    .modal.fade-out .modal-content {
      animation: fadeOut 0.3s;
    }
    
    /* Animaciones para los iconos */
    .icon-pulse {
      animation: pulse 2s infinite;
    }
    
    .icon-shake {
      animation: shake 0.8s ease-in-out;
    }
    
    .icon-bounce {
      animation: bounce 1s infinite;
    }
    
    .icon-spin {
      animation: spin 1s linear infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
</style>



<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <button
        id={buttonId}
        class={`${statusClassButton} text-white font-medium py-2 px-4 rounded-md transition-colors`}
    >
        {textButton}
    </button>
</div>

<div id={modalTextId} class="modal">
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="modal-content bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
      <div class={`${statusClassModal} px-4 py-3 flex justify-between items-center`}>

        <h3 class="text-lg font-medium text-white">{ modalTitle }</h3>

        <button class="modal-close text-white hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </div>

      <div class="p-6">

        <ModalIcon typeIcon="information" />

        <div class="text-center mb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-2">{ modalSubtitle }</h3>
          <p class="text-sm text-gray-500">{ modalText }</p>
        </div>

        <div class="flex justify-end space-x-3">
          <button class="modal-close inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
            { textButtonCancel }
          </button>
          <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
            { textButtonAccept }
          </button>
        </div>

      </div>

    </div>
  </div>
</div>




<!-- Modal de Error -->
<div id="errorModal" class="modal">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="modal-content bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
        <div class="bg-red-500 px-4 py-3 flex justify-between items-center">
          <h3 class="text-lg font-medium text-white">Error</h3>
          <button class="modal-close text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">

          <div class="flex items-center justify-center mb-4">
            <div class="rounded-full bg-red-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500 icon-shake" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          <div class="text-center mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">¿Estás seguro de eliminar este elemento?</h3>
            <p class="text-sm text-gray-500">Esta acción no se puede deshacer. El elemento será eliminado permanentemente de nuestros servidores.</p>
          </div>

          <div class="flex justify-end space-x-3">
            <button class="modal-close inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
              Cancelar
            </button>
            <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal de Advertencia -->
  <div id="warningModal" class="modal">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="modal-content bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
        <div class="bg-yellow-500 px-4 py-3 flex justify-between items-center">
          <h3 class="text-lg font-medium text-white">Advertencia</h3>
          <button class="modal-close text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">

          <div class="flex items-center justify-center mb-4">

            <div class="rounded-full bg-yellow-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-yellow-500 icon-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

          </div>

          <div class="text-center mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">Cambios no guardados</h3>
            <p class="text-sm text-gray-500">Tienes cambios sin guardar. Si continúas, perderás todas las modificaciones realizadas.</p>
          </div>

          <div class="flex justify-end space-x-3">
            <button class="modal-close inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors">
              Cancelar
            </button>
            <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal Informativo -->
  <div id="infoModal" class="modal">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="modal-content bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
        <div class="bg-picton-blue-500 px-4 py-3 flex justify-between items-center">
          <h3 class="text-lg font-medium text-white">Información</h3>
          <button class="modal-close text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">

          <div class="flex items-center justify-center mb-4">

            <div class="rounded-full bg-picton-blue-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-picton-blue-500 icon-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

          </div>

          <div class="text-center mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">Actualización disponible</h3>
            <p class="text-sm text-gray-500">Hay una nueva versión disponible con mejoras y correcciones. ¿Deseas actualizar ahora?</p>
          </div>

          <div class="flex justify-end space-x-3">
            <button class="modal-close inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-picton-blue-500 transition-colors">
              Más tarde
            </button>
            <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-picton-blue-600 hover:bg-picton-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-picton-blue-500 transition-colors">
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal de Éxito -->
  <div id="successModal" class="modal">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="modal-content bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
        <div class="bg-green-500 px-4 py-3 flex justify-between items-center">
          <h3 class="text-lg font-medium text-white">Éxito</h3>
          <button class="modal-close text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">

          <div class="flex items-center justify-center mb-4">

            <div class="rounded-full bg-green-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500 icon-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>

          </div>

          <div class="text-center mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">¡Operación completada!</h3>
            <p class="text-sm text-gray-500">Los cambios se han guardado correctamente. Tu información ha sido actualizada.</p>
          </div>

          <div class="flex justify-center">
            <button class="modal-close inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal de Confirmación -->
  <div id="confirmModal" class="modal">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="modal-content bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
        <div class="bg-purple-500 px-4 py-3 flex justify-between items-center">
          <h3 class="text-lg font-medium text-white">Confirmación</h3>
          <button class="modal-close text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">

          <div class="flex items-center justify-center mb-4">

            <div class="rounded-full bg-purple-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-purple-500 icon-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

          </div>

          <div class="text-center mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">¿Deseas realizar esta acción?</h3>
            <p class="text-sm text-gray-500">Por favor confirma que deseas proceder con esta operación.</p>
          </div>

          <div class="flex justify-end space-x-3">
            <button class="modal-close inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
              Cancelar
            </button>
            <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal de Carga -->
  <div id="loadingModal" class="modal">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="modal-content bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
        <div class="bg-indigo-500 px-4 py-3 flex justify-between items-center">
          <h3 class="text-lg font-medium text-white">Procesando</h3>
          <button class="modal-close text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">

          <div class="flex items-center justify-center mb-4">

            <div class="rounded-full bg-indigo-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-500 icon-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>

          </div>

          <div class="text-center mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">Procesando tu solicitud</h3>
            <p class="text-sm text-gray-500">Por favor espera mientras completamos la operación. Esto puede tardar unos momentos.</p>
          </div>

          <div class="flex justify-center">
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-indigo-600 h-2.5 rounded-full" style="width: 45%"></div>
            </div>
          </div>

          <div class="mt-4 flex justify-center">
            <button class="modal-close inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>