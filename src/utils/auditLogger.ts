
type AuditAction = 'create' | 'update' | 'delete';
type AccountingEntity = 
  | 'journal_entry'
  | 'chart_of_accounts'
  | 'bank_account'
  | 'reconciliation'
  | 'year_end_closing';

interface AuditLogEntry {
  id: string;
  action: AuditAction;
  entity: AccountingEntity;
  entityId: string;
  entityName: string;
  changes: Array<{
    field: string;
    oldValue: string;
    newValue: string;
  }>;
  user: string;
  timestamp: string;
}

export const logAccountingActivity = (
  action: AuditAction,
  entity: AccountingEntity,
  entityId: string,
  entityName: string,
  changes: Array<{ field: string; oldValue: string; newValue: string }>,
  user: string = 'System'
): AuditLogEntry => {
  const logEntry: AuditLogEntry = {
    id: `LOG${Date.now()}`,
    action,
    entity,
    entityId,
    entityName,
    changes,
    user,
    timestamp: new Date().toISOString(),
  };

  // In a real application, this would be stored in a database
  console.log('Accounting Activity Log:', logEntry);
  return logEntry;
};
