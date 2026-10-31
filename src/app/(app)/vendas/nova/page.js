"use client";

import { useState } from "react";

// Dados de mentira, só para o front. Depois vêm do back-end.
const PESSOAS = [
  { id: 1, nome: "Ana Souza", tipo: "cliente", whatsapp: "(66) 99999-1111", nascimento: "2008-03-14", responsavel: "(66) 99999-0000", divida: 80 },
  { id: 2, nome: "Bruno Lima", tipo: "cliente", whatsapp: "(66) 99999-2222", nascimento: "2007-11-02", responsavel: "", divida: 0 },
  { id: 3, nome: "Carla (convidada)", tipo: "convidado", whatsapp: "(66) 99999-3333", nascimento: "", responsavel: "", divida: 25.5 },
];

const PRODUTOS = [
  { id: 1, nome: "Pastel", preco: 6 },
  { id: 2, nome: "Refrigerante", preco: 5 },
  { id: 3, nome: "Brigadeiro", preco: 3 },
];

const reais = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const campo =
  "w-full rounded-lg border border-neutral-600 bg-neutral-700 px-3 py-2 text-white outline-none focus:border-white";

export default function NovaVenda() {
  const [pessoaId, setPessoaId] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [data, setData] = useState("");
  const [pagamento, setPagamento] = useState("avista");
  const [aviso, setAviso] = useState("");

  const pessoa = PESSOAS.find((p) => p.id === Number(pessoaId));
  const produto = PRODUTOS.find((p) => p.id === Number(produtoId));
  const total = produto ? produto.preco * quantidade : 0;
  const podeAplicar = pessoa && produto && quantidade > 0;

  function aplicar() {
    setAviso(
      `Venda simulada: ${quantidade}x ${produto.nome} para ${pessoa.nome} (${reais(total)}, ${
        pagamento === "fiado" ? "fiado" : "à vista"
      }).`
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Nova venda</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Coluna esquerda: nome + ficha */}
        <div className="flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Nome:</span>
            <select
              className={campo}
              value={pessoaId}
              onChange={(e) => {
                setPessoaId(e.target.value);
                setAviso("");
              }}
            >
              <option value="">Selecione uma pessoa</option>
              {PESSOAS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </label>

          <div>
            <h2 className="mb-2 text-lg font-semibold">Ficha do cliente:</h2>
            <div className="min-h-64 rounded-lg bg-neutral-700 p-5">
              {pessoa ? (
                <div className="flex h-full flex-col gap-2">
                  <p className="text-xl font-bold">{pessoa.nome}</p>
                  <p className="text-sm text-neutral-300">
                    Tipo: <span className="capitalize">{pessoa.tipo}</span>
                  </p>
                  <p className="text-sm text-neutral-300">WhatsApp: {pessoa.whatsapp}</p>
                  {pessoa.nascimento && (
                    <p className="text-sm text-neutral-300">
                      Nascimento: {new Date(pessoa.nascimento + "T00:00:00").toLocaleDateString("pt-BR")}
                    </p>
                  )}
                  {pessoa.responsavel && (
                    <p className="text-sm text-neutral-300">Responsável: {pessoa.responsavel}</p>
                  )}

                  <p
                    className={`mt-auto pt-4 text-2xl font-bold ${
                      pessoa.divida > 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {pessoa.divida > 0 ? `Deve ${reais(pessoa.divida)}` : "Sem dívidas"}
                  </p>
                </div>
              ) : (
                <p className="text-neutral-400">Selecione uma pessoa para ver a ficha.</p>
              )}
            </div>
          </div>
        </div>

        {/* Coluna direita: produto, data e aplicar */}
        <div className="flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Produto:</span>
            <select
              className={campo}
              value={produtoId}
              onChange={(e) => {
                setProdutoId(e.target.value);
                setAviso("");
              }}
            >
              <option value="">Selecione um produto</option>
              {PRODUTOS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome} ({reais(p.preco)})
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-lg font-semibold">Quantidade:</span>
              <input
                type="number"
                min="1"
                className={campo}
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-lg font-semibold">Pagamento:</span>
              <select
                className={campo}
                value={pagamento}
                onChange={(e) => setPagamento(e.target.value)}
              >
                <option value="avista">À vista</option>
                <option value="fiado">Fiado</option>
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Data da venda:</span>
            <input
              type="date"
              className={campo}
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </label>

          <div className="mt-auto flex flex-col items-end gap-3">
            <p className="text-lg">
              Total: <span className="font-bold">{reais(total)}</span>
            </p>
            <button
              onClick={aplicar}
              disabled={!podeAplicar}
              className="rounded-lg bg-green-600 px-8 py-4 text-xl font-bold hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:text-neutral-400"
            >
              Aplicar?
            </button>
            {aviso && <p className="text-right text-sm text-green-400">{aviso}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}