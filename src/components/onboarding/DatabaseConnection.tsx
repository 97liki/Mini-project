import MotherDuckConnection from "./database/MotherDuckConnection";
import GroqConnection from "./database/GroqConnection";
import type { DataLimit } from "./DataSelectionStep";

interface DatabaseConnectionProps {
  token: string | undefined;
  onTokenChange: (token: string) => void;
  groqToken?: string;
  onGroqTokenChange: (token: string) => void;
  onConnectionStatusChange: (isConnected: boolean) => void;
  onGroqStatusChange: (isConnected: boolean) => void;
  onDatabaseSelect: (database: string, table: string) => void;
  selectedLimit?: DataLimit;
  onLimitSelect?: (limit: DataLimit) => void;
}

export default function DatabaseConnection({
  token,
  onTokenChange,
  groqToken,
  onGroqTokenChange,
  onConnectionStatusChange,
  onGroqStatusChange,
  onDatabaseSelect,
  selectedLimit = 1000,
  onLimitSelect = () => {},
}: DatabaseConnectionProps) {
  return (
    <div className="space-y-6">
      <MotherDuckConnection
        token={token}
        onTokenChange={onTokenChange}
        onConnectionSuccess={() => onConnectionStatusChange(true)}
        onConnectionError={() => onConnectionStatusChange(false)}
        onDatabaseSelect={onDatabaseSelect}
        selectedLimit={selectedLimit}
        onLimitSelect={onLimitSelect}
      />

      <div className="pt-6 border-t border-gray-700">
        <GroqConnection
          token={groqToken}
          onTokenChange={onGroqTokenChange}
          onConnectionSuccess={() => onGroqStatusChange(true)}
          onConnectionError={() => onGroqStatusChange(false)}
        />
      </div>
    </div>
  );
}
