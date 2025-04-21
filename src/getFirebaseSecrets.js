const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const client = new SecretsManagerClient({ region: 'us-east-1' });

async function getFirebaseSecrets() {
    try {
        const command = new GetSecretValueCommand({
            SecretId: 'tetris-game/prod/firebase-credentials'
        });

        const response = await client.send(command);

        if (!response.SecretString) {
            throw new Error("Segredo vazio no Secrets Manager!");
        }

        // Se for JSON no Secrets Manager, parseia
        return JSON.parse(response.SecretString);

    } catch (error) {
        console.error("Erro ao buscar secrets:", error);
        throw error;
    }
}

module.exports = { getFirebaseSecrets };
