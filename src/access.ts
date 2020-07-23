// src/access.ts
export default function access(initialState: { admin?: ADMIN.Response } = {}) {
  const { admin } = initialState
  return {
    canAdmin: !!admin,
  }
}
