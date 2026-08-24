import { Search, X, AlertTriangle, Eye, Pencil, Trash2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Selo — badge de status                                             */
/* ------------------------------------------------------------------ */

export const variantesPadrao = {
  ativo: "text-green-700 bg-green-100",
  inativo: "text-red-900 bg-red-100",
};

export function Selo({ status, variantes = variantesPadrao }) {
  const estilo = variantes[status] ?? "text-gray-600 bg-gray-100";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${estilo}`}>
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  BotaoAcao — botão de ícone (ver / editar / excluir)                */
/* ------------------------------------------------------------------ */

const coresBotao = {
  neutro: "text-gray-500 hover:bg-gray-100 hover:text-gray-800",
  perigo: "text-gray-500 hover:bg-red-100 hover:text-red-900",
};

export function BotaoAcao({ rotulo, onClick, tom = "neutro", icone: Icone }) {
  return (
    <button
      onClick={onClick}
      aria-label={rotulo}
      title={rotulo}
      className={`rounded-lg p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-900 focus-visible:ring-offset-1 ${coresBotao[tom]}`}
    >
      <Icone size={16} strokeWidth={1.75} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  BarraBuscaFiltro — campo de busca + filtros de status              */
/* ------------------------------------------------------------------ */

export function BarraBuscaFiltro({
  busca,
  onBuscaChange,
  placeholder = "Buscar",
  filtroAtivo,
  onFiltroChange,
  opcoesFiltro = ["todos", "ativo", "inativo"],
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border p-2 pl-9 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-900"
        />
      </div>
      <div className="flex gap-2 text-sm">
        {opcoesFiltro.map((s) => (
          <button
            key={s}
            onClick={() => onFiltroChange(s)}
            className={`rounded-lg px-3 py-2 capitalize transition-colors ${
              filtroAtivo === s
                ? "bg-red-900 text-white"
                : "border text-gray-500 hover:text-gray-800"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FichaCard — item da lista                                         */
/* ------------------------------------------------------------------ */

export function FichaCard({
  id,
  status,
  titulo,
  subtitulo,
  meta,
  onVer,
  onEditar,
  onExcluir,
  variantesSelo,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">#{id}</span>
          <Selo status={status} variantes={variantesSelo} />
        </div>
        <p className="mt-1 truncate font-bold text-gray-900">{titulo}</p>
        <p className="truncate text-sm text-gray-600">{subtitulo}</p>
        <p className="text-xs text-gray-400">{meta}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1 self-end sm:self-auto">
        <BotaoAcao rotulo="Visualizar" icone={Eye} onClick={onVer} />
        <BotaoAcao rotulo="Editar" icone={Pencil} onClick={onEditar} />
        <BotaoAcao rotulo="Excluir" icone={Trash2} tom="perigo" onClick={onExcluir} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PainelLateral — drawer de ver / editar                             */
/* ------------------------------------------------------------------ */

export function PainelLateral({
  aberto,
  modo, // "ver" | "editar"
  idLabel,
  titulo,
  campos = [],
  campoStatus,
  valorStatus,
  opcoesStatus = [],
  variantesSelo,
  onFechar,
  onSalvar,
}) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-20 flex justify-end bg-black/30">
      <div className="h-full w-full max-w-sm overflow-y-auto bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <p className="text-xs uppercase text-gray-400">{idLabel}</p>
            <h2 className="mt-1 text-xl font-bold text-red-900">{titulo}</h2>
          </div>
          <button onClick={onFechar} aria-label="Fechar" className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-800">
            <X size={18} />
          </button>
        </div>

        {modo === "ver" ? (
          <dl className="space-y-5 p-6">
            {campos.map(({ label, valor }) => (
              <div key={label}>
                <dt className="text-xs uppercase text-gray-400">{label}</dt>
                <dd className="mt-1 text-sm text-gray-900">{valor}</dd>
              </div>
            ))}
            {campoStatus && (
              <div>
                <dt className="text-xs uppercase text-gray-400">Status</dt>
                <dd className="mt-1">
                  <Selo status={valorStatus} variantes={variantesSelo} />
                </dd>
              </div>
            )}
          </dl>
        ) : (
          <form onSubmit={onSalvar} className="space-y-4 p-6">
            {campos.map(({ label, name, valor }) => (
              <div key={name}>
                <label className="text-sm text-gray-700">{label}</label>
                <input
                  name={name}
                  defaultValue={valor}
                  required
                  className="mt-1 w-full rounded-lg border p-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-900"
                />
              </div>
            ))}
            {campoStatus && (
              <div>
                <label className="text-sm text-gray-700">Status</label>
                <select
                  name={campoStatus}
                  defaultValue={valorStatus}
                  className="mt-1 w-full rounded-lg border p-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-900"
                >
                  {opcoesStatus.map((o) => (
                    <option key={o.valor} value={o.valor}>
                      {o.rotulo}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <button type="submit" className="rounded-lg bg-red-900 px-4 py-2 font-bold text-white transition hover:bg-red-800">
                Salvar alterações
              </button>
              <button type="button" onClick={onFechar} className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50">
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ModalExclusao — confirmação de exclusão                            */
/* ------------------------------------------------------------------ */

export function ModalExclusao({ item, entidade = "registro", nomeExibido, onCancelar, onConfirmar }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-red-900" strokeWidth={1.75} />
          <div>
            <h3 className="font-bold text-gray-900">Excluir {entidade}?</h3>
            <p className="mt-1 text-sm text-gray-600">
              A ficha de <span className="text-gray-900">{nomeExibido}</span> será removida
              permanentemente. Essa ação não pode ser desfeita.
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onCancelar} className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50">
            Cancelar
          </button>
          <button onClick={onConfirmar} className="rounded-lg bg-red-900 px-4 py-2 font-bold text-white transition hover:bg-red-800">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}