import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
  [request_definition]
  r = sub, obj, act

  [policy_definition]
  p = sub, obj, act

  [role_definition]
  g = _, _

  [policy_effect]
  e = some(where (p.eft == allow))

  [matchers]
  m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
  p, admin, users, (list)|(edit)
  p, admin, tableau_de_bord, list
  
  p, admin, reunion, list
  p, admin, reunion/*, list
  
  p, admin, agenda, (list)|(create)|(edit)|(show)
  p, admin, agenda/*, (edit)|(show)|(delete)

  p, admin, lieu, (list)|(create)|(edit)
  p, admin, lieu/*, (edit)|(show)|(delete)

  p, admin, statut, (list)|(create)|(edit)
  p, admin, statut/*, (edit)|(show)|(delete)

  p, editeur, tableau_de_bord, list

  p, editeur, reunion, list
  p, editeur, reunion/*, list

  p, editeur, agenda, (list)|(show)|(create)
  p, editeur, agenda/*, (edit)|(show)

`);