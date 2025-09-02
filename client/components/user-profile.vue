<template>
  <div class="profile-container">

    <div class="profile-info">
      <p><strong>Prénom:</strong> {{ user?.firstname }}</p>
      <p><strong>Nom:</strong> {{ user?.lastname }}</p>
      <p><strong>Email:</strong> {{ user?.email }}</p>
    </div>

    <div v-if="user?.books?.length" class="borrowed-books">
        <h3>Livres empruntés</h3>
        <ul>
            <li v-for="book in user.books" :key="book.id">
              <div>
                <span> 
                  Titre : 
                  <strong>
                    {{ book.title }}
                  </strong> 
                </span>
                <p>
                  Auteur·ices : 
                  {{ book.authors?.map(a => a.fullname).join(', ') || 'Auteur inconnu' }}
                </p>
                <p>
                  ISBN: {{ book.isbn }}
                </p>
                <UButton
                  icon="i-heroicons-inbox-arrow-down"
                  size="sm"
                  color="red"
                  variant="soft"
                  @click="openUnborrowModal(book)"
                >
                  Rendre le livre
                </UButton>
              </div>
            </li>
        </ul>
    </div>
    <div v-else class="borrowed-books-empty">
        <p>Aucun livre emprunté actuellement.</p>
    </div>

    <UnborrowBookModal
      v-if="showUnborrowModal && selectedBook"
      :book="selectedBook"
      @close="showUnborrowModal = false"
      @unborrowed="handleBookUnborrowed"
    />

    <div class="profile-actions">
      <UButton
        icon="i-heroicons-pencil-square"
        size="sm"
        color="primary"
        variant="soft"
        @click="showEditModal = true"
      >
        Modifier mes informations
      </UButton>

      <UButton
        icon="i-heroicons-arrow-left-on-rectangle"
        size="sm"
        color="red"
        variant="soft"
        @click="logout"
      >
        Me déconnecter
      </UButton>
    </div>

    <EditUserModal
      v-if="showEditModal && user"
      :user="user"
      @close="showEditModal = false"
      @save="updateUserLocally"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { checkUserSession,} from "../api/users-actions"

interface Authors {
  id: number;
  firstname: string;
  lastname: string;
  fullname: string;
}

interface Book {
  id: number;
  title: string;
  nbAvailable: number;
  nbShared: number;
  isbn: string;
  owned: boolean;
  authors: Authors[];
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  books: Book[];
  createdAt: string;
  updatedAt: string;
}

const user = useState<User | null>('user')
const books = ref({})
const showEditModal = ref(false)
const showUnborrowModal = ref(false)
const selectedBook = ref<Book | null>(null)
const toast = useToast()
const router = useRouter();


const openUnborrowModal = (book: Book) => {
  selectedBook.value = book
  showUnborrowModal.value = true
}

const handleBookUnborrowed = (updatedBook: Book) => {
  if (user.value && user.value.books) {
    user.value.books = user.value.books.filter(book => book.id !== updatedBook.id);
  }
}


onMounted(async () => {
  const isConnected = await checkUserSession();
  if (!isConnected){
    router.push('/login');
  }
  const res = await fetch('http://localhost:2000/api/v1/users/currentUser', 
    { credentials: 'include' }
  )
  const data = await res.json()
  user.value = data

  const booksRes = await fetch('http://localhost:2000/api/v1/books/')
  const booksData = await booksRes.json()

  books.value = booksData

  if (user.value?.books?.length) {
    user.value.books = user.value.books.map(userBook => {
      const fullBook = booksData.find(b => b.id === userBook.id) || {};
      return {
        ...userBook,
        ...fullBook,
        authors: userBook.authors || fullBook.authors || [],
      };
    });
  }
})


const logout = async () => {
  await fetch('http://localhost:2000/api/v1/users/logout', {
    method: 'DELETE',
    credentials: 'include',
  })

  toast.add({ title: 'Déconnexion réussie', icon: 'i-heroicons-check-circle', color: 'green' })
  window.location.href = '/login'
}

const updateUserLocally = (updated: any) => {
  user.value = { ...user.value, ...updated } // this replaces the object = reactivity triggered
}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #1e1e1e;
  border-radius: 12px;
  color: #ccc;
}
.profile-info p {
  margin: 0.5rem 0;
}
.borrowed-books, .borrowed-books-empty {
  margin-top: 2rem;
  background-color: #2a2a2a;
  padding: 1rem;
  border-radius: 8px;
}

.borrowed-books h3 {
  color: #fff;
  margin-bottom: 1rem;
}

.borrowed-books p {
  margin: 0.2rem 0;
}

.borrowed-books ul {
  list-style: none;
  padding: 0;
}

.borrowed-books li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #444;
}

.borrowed-books li:last-child {
  border-bottom: none;
}

.profile-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
