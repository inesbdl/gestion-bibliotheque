<script setup lang="ts">

interface User {
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
}

// const user = useState<User | null>('user', () => null)

// onMounted(async () => {
//   if (!user.value) {
//     try {
//       const res = await fetch('http://localhost:2000/api/v1/users/currentUser', {
//         credentials: 'include'
//       });
//       if (res.ok) {
//         const data = await res.json();
//         user.value = data;
//       }
//     } catch (err) {
//       user.value = null;
//     }
//   }
// });


const links = computed(() => {
  return [
    [
      {
        label: 'Bibliothèque',
        icon: 'i-heroicons-building-library',
        to: '/'
      },
      {
        label: 'Ajouter un livre',
        icon: 'i-heroicons-book-open',
        to: 'addBook'
      },
      {
        label : 'Propositions de livres',
        icon: 'i-heroicons-shopping-bag',
        to: 'booksToBuy'
      },
    ],
    [ 
      // user.value  - LORS DE LA REMISE DE LA CONNEXION REACTIVER LE MIDDLEWARE DANS LES ROUTES BACK
      //   ? {
      //       label: 'Paramètres',
      //       icon: 'i-heroicons-wrench-screwdriver',
      //       to: 'parameters'
      //     }
      //   : {
            
      //     },
      {
        label: 'Paramètres',
        icon: 'i-heroicons-wrench-screwdriver',
        to: 'parameters'
      },
      {
        label: 'Guide',
        icon: 'i-heroicons-question-mark-circle',
        to: 'guide'
      },
      // user.value
      //   ? {
      //       label: user.value.fullname,
      //       icon: 'i-heroicons-user-circle',
      //       to: 'profile' 
      //     }
      //   : {
      //       label: 'Connexion',
      //       icon: 'i-heroicons-user-circle',
      //       to: 'login'
      //     }
    ]
  ];
});

</script>

<template>
    <header class="header">
        <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
    </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #121212;
  box-shadow: 0 2px 10px rgba(128, 125, 125, 0.1); 
  z-index: 1000; 
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

</style>
