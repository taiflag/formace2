/* Contas cadastradas, só no navegador, enquanto não há back-end.
   A senha nunca é guardada: só um resumo (hash) dela.
   Semana 4: trocar estas duas funções por chamadas Axios (cadastro e login). */

type Conta = { email: string; hash: string };
const CHAVE = "contas-cadastradas";

function ler(): Conta[] {
  try {
    const t = localStorage.getItem(CHAVE);
    return t ? (JSON.parse(t) as Conta[]) : [];
  } catch {
    return [];
  }
}

function salvar(contas: Conta[]) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(contas));
  } catch {
    /* navegador bloqueou o armazenamento */
  }
}

async function resumo(email: string, senha: string) {
  const dados = new TextEncoder().encode(`${email}::${senha}`);
  const bytes = new Uint8Array(await crypto.subtle.digest("SHA-256", dados));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Devolve false se o e-mail já estiver cadastrado. */
export async function cadastrarConta(
  email: string,
  senha: string,
): Promise<boolean> {
  const mail = email.trim().toLowerCase();
  const contas = ler();
  if (contas.some((c) => c.email === mail)) return false;
  salvar([...contas, { email: mail, hash: await resumo(mail, senha) }]);
  return true;
}

/** Devolve true se o e-mail e a senha batem com uma conta cadastrada. */
export async function entrarNaConta(
  email: string,
  senha: string,
): Promise<boolean> {
  const mail = email.trim().toLowerCase();
  const hash = await resumo(mail, senha);
  return ler().some((c) => c.email === mail && c.hash === hash);
}
