export class ServerConfig {
    static config: any = {};

    static setConfig(configString: string) {
        process.env.config = configString;
    }
    
    static getConfig() {
        return JSON.parse(process.env.config!);
    }
}