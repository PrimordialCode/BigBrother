/*
 * ideas coming from: https://aclottan.wordpress.com/2016/12/30/load-configuration-from-external-file/
 */

export class ConfigurationEndpoint {
  constructor(
    public name: string,
    public endpoint: string
  ) { }
}

export class Configuration {
  constructor(
    public endpoints: ConfigurationEndpoint[]
  ) { }
}
