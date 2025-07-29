export type Config = {
  olymps: {
    list: string[]
  }

  messages: {
    "final-stage": {
      "not-registered": string
    }
  }
  config: {
    added: Record<string, string[]>
  }
}