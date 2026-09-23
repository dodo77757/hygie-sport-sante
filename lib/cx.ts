export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function estExterne(href: string) {
  return /^https?:\/\//.test(href);
}

export function estSpecial(href: string) {
  return /^(tel:|mailto:)/.test(href);
}
