<template>
    <div class="container">
        <ToBack title="Calculadora" />

        <div class="container-calculator">
            <font-awesome-icon icon="frog" class="icon-calculator" />
            <h1>
                FROG
                <br>
                <span>calculator</span>
            </h1>

            <InputText
                v-model="inputValue"
                class="component"
                name="Resultado"
                @keydown="handleKeyDown"
                placeholder="0"
                readonly=true
            />

            <div class="buttons">
                <button @click="clearInput" class="icons">
                    <font-awesome-icon icon="trash-can" />
                </button>
                <button @click="input('/')" class="icons">
                    <font-awesome-icon icon="divide" />
                </button>
                <button @click="input('*')" class="icons">
                    <font-awesome-icon :icon="['fas', 'gear']" />
                </button>
                <button @click="backspace" class="icons">
                    <font-awesome-icon :icon="['fas', 'delete-left']" />
                </button>
                <button @click="input('7')" class="numbers">
                    7
                </button>
                <button @click="input('8')" class="numbers">
                    8
                </button>
                <button @click="input('9')" class="numbers">
                    9
                </button>
                <button @click="input('-')" class="icons">
                    <font-awesome-icon :icon="['fas', 'minus']" />
                </button>
                <button @click="input('4')" class="numbers">
                    4
                </button>
                <button @click="input('5')" class="numbers">
                    5
                </button>
                <button @click="input('6')" class="numbers">
                    6
                </button>
                <button @click="input('+')" class="icons">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </button>
                <button @click="input('1')" class="numbers">
                    1
                </button>
                <button @click="input('2')" class="numbers">
                    2
                </button>
                <button @click="input('3')" class="numbers">
                    3
                </button>
                <button @click="calculate" class="icons">
                    <font-awesome-icon :icon="['fas', 'equals']" />
                </button>
                <button @click="input('0')" class="column-3 numbers">
                    0
                </button>
                <button @click="input('.')" class="icons">
                    .
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";
    
    export default defineComponent({
        name: "Calculator",
        setup() {
            const inputValue = ref("")
        
            const input = (value: string) => {
                inputValue.value += value
            }
        
            const clearInput = () => {
                inputValue.value = ""
            }
        
            const backspace = () => {
                inputValue.value = inputValue.value.slice(0, -1)
            }
        
            const calculate = () => {
                try {
                inputValue.value = eval(inputValue.value).toString()
                } catch (e) {
                inputValue.value = "Erro"
                }
            }
        
            const handleKeyDown = (e: KeyboardEvent) => {
                const validKeys = "0123456789+-*/."
                if (validKeys.includes(e.key)) {
                input(e.key)
                } else if (e.key === "Enter") {
                calculate()
                } else if (e.key === "Backspace") {
                backspace()
                } else if (e.key === "Escape") {
                clearInput()
                }
            }
        
            return {
                inputValue,
                input,
                clearInput,
                backspace,
                calculate,
                handleKeyDown,
            }
        }
    })
</script>

<style scoped>
    .container-calculator {
        max-width: 350px;
        margin: 0 auto;
        padding: 20px;
        background-color: var(--container-color);
        border-radius: 10px;
        text-align: center;
    }

    .container-calculator h1 {
        color: var(--text-color);
        font-size: 35px;
        text-align: center;
        padding: 20px;
        margin-top: -20px;
        margin-bottom: -9px;
    }
    
    .icon-calculator {
        color: var(--text-color);
        font-size: 50px;
    }
    
    .buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }

    .icons {
        background-color: var(--text-color);
        color: var(--container-color);
        border: 1px solid var(--container-color);
    }

    .numbers {
        background-color: var(--text-container-color);
        color: var(--text-color);
        border: 1px solid var(--text-color);
    }

    .icons,
    .numbers {
        height: 50px;
        font-size: 1.5rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .icons:active,
    .numbers:active {
        background-color: var(--container-color);
        color: var(--text-color);
    }

    .column-3 {
        grid-column: span 3;
    }

    .component {
        width: 100%;
        margin-left: -20px;
    }
</style>
  