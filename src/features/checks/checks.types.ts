/** A stored verification. */
export type Check = {
  checkedAt: Date;
  /** null: «Hasta que lo desmarque», never expires. */
  expiresAt: Date | null;
  hasPhoto: boolean;
};

/** What a CheckRow shows. Computed by the caller; the row never decides it. */
export type CheckStatus =
  | { kind: 'pending' }
  | {
      kind: 'verified';
      checkedAt: Date;
      /** null: «sin vencimiento». */
      expiresAt: Date | null;
      hasPhoto: boolean;
    }
  /** Back to pending, saying when it expired. Only during that day. */
  | { kind: 'expiredToday'; expiredAt: Date };
