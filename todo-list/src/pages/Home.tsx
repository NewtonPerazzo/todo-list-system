import { Header } from '../components/molecules/Header';
import { ToDoForm } from '../components/organisms/ToDoForm';
import { ToDoList } from '../components/organisms/ToDoList';

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col gap-6 md:gap-8 items-center">
          <ToDoForm />
          <ToDoList />
        </div>
      </main>
    </div>
  );
}
