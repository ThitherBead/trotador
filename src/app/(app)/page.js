export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-lg bg-neutral-700 p-4">Total vendido</div>
      <div className="rounded-lg bg-neutral-700 p-4">A receber</div>
      <div className="rounded-lg bg-neutral-700 p-4">Vendas recentes</div>
      <div className="rounded-lg bg-neutral-700 p-4">Produtos</div>
      <div className="rounded-lg bg-neutral-700 p-4">Devedores recentes</div>
      <div className="rounded-lg bg-neutral-700 p-4">Maiores devedores</div>
    </div>
  );
}