import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'aiux-acl|x-snc-itsm-lux-home-page|read|itsm-dashboard-access': {
                        table: 'sys_security_acl'
                        id: '4c5b20826b744a9a86c471e55ea17c40'
                    }
                    'aiux-acl|x-snc-itsm-lux-incidents-page|read|itsm-incidents-access': {
                        table: 'sys_security_acl'
                        id: '08095a8f6a3541f9ae936398da2ce68b'
                    }
                    'aiux-color-swatch|itsm-lux': {
                        table: 'sys_aix_color_swatch'
                        id: '1722a5d3114ff52d1618d23c3d89c76a'
                    }
                    'aiux-experience-page-rel|x-snc-itsm-lux-home-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: '097512078f80d6ad2b544d11ce103fba'
                    }
                    'aiux-experience-page-rel|x-snc-itsm-lux-incidents-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: 'c2a9c6a85421b513e57268792ab85ffd'
                    }
                    'aiux-experience-prop|appHeadCss': {
                        table: 'sys_aix_experience_properties'
                        id: '2c88931bff78bbc025b4b2b59175365e'
                    }
                    'aiux-experience-prop|appPlatform': {
                        table: 'sys_aix_experience_properties'
                        id: 'aa58fe741cbbfafecd779b95e408f9bf'
                    }
                    'aiux-experience-prop|appTailwindCss': {
                        table: 'sys_aix_experience_properties'
                        id: 'ef9b71d5a7e028178e58a418b0a6d83a'
                    }
                    'aiux-experience|itsm-lux': {
                        table: 'sys_aix_experience'
                        id: '42ae8fc549071a0a294c4f318ad70c96'
                    }
                    'aiux-layout-widget|lifecycle': {
                        table: 'sys_aix_widget'
                        id: '3be9da93417325b2ed8f250c7f5f56b1'
                    }
                    'aiux-page-widget|x-snc-itsm-lux-home-page': {
                        table: 'sys_aix_widget'
                        id: '34b55e43f21ad37e228327ec7e42f1cd'
                    }
                    'aiux-page-widget|x-snc-itsm-lux-incidents-page': {
                        table: 'sys_aix_widget'
                        id: 'cde07ca7ce79cabfb8c80c0887d675af'
                    }
                    'aiux-page|x-snc-itsm-lux-home-page': {
                        table: 'sys_aix_page'
                        id: 'dfaf765e5724bb0b0769719c371e5ce6'
                    }
                    'aiux-page|x-snc-itsm-lux-incidents-page': {
                        table: 'sys_aix_page'
                        id: '03c708fc0592cc497df287571afbf797'
                    }
                    'aiux-project|x_snc_itsm_lux': {
                        table: 'sys_aix_project'
                        id: '77cc557ef9558d03dc4fd185f145be1c'
                    }
                    'aiux-theme|itsm-lux': {
                        table: 'sys_aix_theme'
                        id: 'c72e4331ba0178792fcc6be07d677ac3'
                    }
                    'aiux-widget|aiux-hello-world': {
                        table: 'sys_aix_widget'
                        id: '9764030858ac007472dac00c2be9249d'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'e0a180c4ae40453dad9560d0c4a5299f'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'f4f4a60765784a97812e9b6f0c552949'
                    }
                }
                composite: [
                    {
                        table: 'sys_security_acl_role'
                        id: '30f7db49d4f34cbd85b5433b41e4b4da'
                        key: {
                            sys_security_acl: '08095a8f6a3541f9ae936398da2ce68b'
                            sys_user_role: {
                                id: 'b662661bb0a84de59b8ea49a2722111b'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '607f7dd5654a4645b66408dcc1412f02'
                        key: {
                            application_file: '77cc557ef9558d03dc4fd185f145be1c'
                            source_artifact: '7f6253e266c84a309a12e560d6dd3cbb'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '794e216ab28d49c4a59bc14eb7261ce7'
                        key: {
                            sys_security_acl: '08095a8f6a3541f9ae936398da2ce68b'
                            sys_user_role: {
                                id: 'a6661c2edbf642539978e7c9a9dfb285'
                                key: {
                                    name: 'itil'
                                }
                            }
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '7f6253e266c84a309a12e560d6dd3cbb'
                        key: {
                            name: 'aiux-source 77cc557ef9558d03dc4fd185f145be1c'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8d8172f9c1b7441dba28fe245ac2eb6a'
                        key: {
                            sys_security_acl: '4c5b20826b744a9a86c471e55ea17c40'
                            sys_user_role: {
                                id: 'b662661bb0a84de59b8ea49a2722111b'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c6404f5ee236411f8826ae5493c74a14'
                        key: {
                            sys_security_acl: '4c5b20826b744a9a86c471e55ea17c40'
                            sys_user_role: {
                                id: 'a6661c2edbf642539978e7c9a9dfb285'
                                key: {
                                    name: 'itil'
                                }
                            }
                        }
                    },
                ]
            }
        }
    }
}
