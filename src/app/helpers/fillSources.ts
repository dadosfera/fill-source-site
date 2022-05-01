export function fillSources(tabId: number, fillCredentials: any) {
  return chrome.scripting.executeScript({
    target: { tabId },
    func: (credentials) => {
      if (credentials) {
        const KEY_TO_ID = {
          jdbc_user: 'jdbc-user-fill',
          jdbc_password: 'jdbc-password-fill',
          database: 'database-fill',
          schema: 'schema-fill',
          endpoint: 'endpoint-fill',
          port: 'port-fill',
        } as any;

        Object.entries(credentials).forEach(([key, value]) => {
          if (KEY_TO_ID[key]) {
            const input = document.getElementById(
              KEY_TO_ID[key]
            ) as HTMLInputElement;

            if (input) {
              const backgroundColor = input.style.backgroundColor;
              const transition = input.style.transition;
              input.style.backgroundColor = '#7CFC0040';
              input.value = value as string;
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
              input.style.transition = 'all 1s';
              setTimeout(() => {
                input.style.backgroundColor = backgroundColor;
                input.style.transition = transition;
              }, 400);
            }
          }
        });
      }
    },
    args: [fillCredentials],
  });
}
