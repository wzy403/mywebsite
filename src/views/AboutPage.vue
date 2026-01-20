<template>
  <div class="about-page">
    <NavBar />

    <main class="about-main">
      <div class="terminal" @click="focusCommandInput">
        <!-- 终端标题栏 -->
        <div class="terminal-header">
          <div class="terminal-buttons">
            <span class="terminal-btn close"></span>
            <span class="terminal-btn minimize"></span>
            <span class="terminal-btn maximize"></span>
          </div>
          <span class="terminal-title">About Me</span>
          <div class="terminal-spacer"></div>
        </div>

        <!-- 终端内容 -->
        <div class="terminal-body" ref="terminalContent">
          <div
            v-for="(line, index) in content"
            :key="index"
            class="terminal-line"
          >
            <span v-if="line.isCommand" class="prompt">❯ </span>
            <span v-if="line.needColor" class="tag" :class="line.class">
              {{ line.colorText }}
            </span>
            <span class="line-text">{{ line.text }}</span>
          </div>

          <!-- 输入行 -->
          <div class="terminal-input-line">
            <span class="prompt">❯ </span>
            <span class="input-text">{{ commandBeforeCursor }}</span>
            <span class="cursor"></span>
            <span class="input-text">{{ commandAfterCursor }}</span>
            <input
              ref="commandInput"
              class="hidden-input"
              type="text"
              v-model="command"
              @input="updateCursor"
              @keyup="updateCursor"
              @keypress.enter="processCommand"
              v-show="isCommendInputDisplay"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import aboutCommand from "@/assets/aboutCommand.json";

export default {
  name: "AboutPage",
  components: {
    NavBar,
  },
  data() {
    return {
      command: "",
      cursorPos: 0,
      content: [],
      isCommendInputDisplay: false,
    };
  },
  computed: {
    commandBeforeCursor() {
      return this.command.slice(0, this.cursorPos);
    },
    commandAfterCursor() {
      return this.command.slice(this.cursorPos);
    },
  },
  mounted() {
    this.content = [];
    this.animateContent("intro");
  },
  methods: {
    async animateContent(command) {
      await this.displayLoadingDots();
      await this.typeContent(command);

      this.content.push({
        needColor: true,
        class: ["tag-system"],
        colorText: "System",
        text: ` Type "help" to get a supporting command list.`,
      });
      this.content.push({
        needColor: true,
        class: ["tag-system"],
        colorText: "System",
        text: ` Type "clear" to clear the terminal screen.`,
      });
      this.content.push({
        needColor: true,
        class: ["tag-system"],
        colorText: "System",
        text: ` Type "exit" to return to the main page.`,
      });
      this.isCommendInputDisplay = true;
      this.$nextTick(() => {
        this.focusCommandInput();
      });
    },

    async displayLoadingDots() {
      const loadingText = { text: "Loading", isCommand: false };
      this.content.push(loadingText);
      this.focusCommandInput();

      for (let i = 0; i < 3; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        loadingText.text += ".";
        this.$forceUpdate();
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      this.content.pop();
    },

    async typeContent(inputCommand) {
      if (aboutCommand[inputCommand]) {
        for (let key in aboutCommand[inputCommand]) {
          for (let line of aboutCommand[inputCommand][key]) {
            await this.typeLine(line, inputCommand, key);
          }
        }
      }
      this.$nextTick(() => {
        const terminalContent = this.$refs.terminalContent;
        terminalContent.scrollTop = terminalContent.scrollHeight;
      });
    },

    async typeLine(line, inputCommand, key) {
      let obj = {};
      if (key === "Weclome" || key === "MySignature") {
        obj = { text: "" };
      } else {
        obj = {
          needColor: true,
          class: [this.getTagClass(key)],
          colorText: key,
          text: "",
        };
      }
      this.content.push(obj);
      let currentText = "";
      for (let char of line) {
        currentText += char;
        obj.text = currentText;
        this.$forceUpdate();
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    },

    getTagClass(key) {
      const classMap = {
        'Name': 'tag-name',
        'School': 'tag-name',
        'Program': 'tag-name',
        'Email': 'tag-name',
        'connect': 'tag-name',
        'help': 'tag-success',
        'ls': 'tag-success',
        'A': 'tag-success',
        'Done': 'tag-success',
        'System': 'tag-system',
        'B': 'tag-warning',
        'Stacking': 'tag-error',
        'Error': 'tag-error',
      };
      return classMap[key] || 'tag-system';
    },

    focusCommandInput() {
      if (this.$refs.commandInput) {
        this.$refs.commandInput.focus();
      }
    },

    updateCursor() {
      this.cursorPos = this.$refs.commandInput.selectionStart;
      if (this.cursorPos < 0) {
        this.cursorPos = 0;
      }
    },

    processCommand() {
      const inputCommand = this.command.trim().toLowerCase();
      this.content.push({ isCommand: true, text: inputCommand });

      if (inputCommand === "clear") {
        this.content = [];
        this.command = "";
        this.focusCommandInput();
        return;
      }

      if (inputCommand === "exit") {
        this.$router.push({ path: "/" });
        return;
      }

      if (inputCommand === "blog") {
        this.$router.push({ path: "/blog" });
        return;
      }

      if (inputCommand === "project") {
        this.$router.push({ path: "/project" });
        return;
      }

      if (aboutCommand[inputCommand]) {
        for (let key in aboutCommand[inputCommand]) {
          for (let line of aboutCommand[inputCommand][key]) {
            if (key === "Weclome" || key === "MySignature") {
              this.content.push({ text: line });
              continue;
            }

            this.content.push({
              needColor: true,
              class: [this.getTagClass(key)],
              colorText: key,
              text: line,
            });
          }
        }
      } else {
        this.content.push({
          needColor: true,
          class: ["tag-error"],
          colorText: "Error",
          text: ` command not found: ${inputCommand}`,
        });
        this.content.push({
          needColor: true,
          class: ["tag-system"],
          colorText: "System",
          text: ` Type "help" to get a supporting command list.`,
        });
      }

      this.command = "";
      this.focusCommandInput();

      this.$nextTick(() => {
        const terminalContent = this.$refs.terminalContent;
        terminalContent.scrollTop = terminalContent.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
.about-page {
  min-height: 100vh;
}

.about-main {
  padding-top: calc(60px + var(--spacing-6));
  padding-bottom: var(--spacing-8);
  display: flex;
  justify-content: center;
}

/* 终端容器 */
.terminal {
  width: 90%;
  max-width: 900px;
  background: var(--terminal-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}

/* 终端标题栏 */
.terminal-header {
  display: flex;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-4);
  background: #2D2A28;
  border-bottom: 1px solid #3A3735;
}

.terminal-buttons {
  display: flex;
  align-items: center;
}

.terminal-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: var(--spacing-2);
}

.terminal-btn.close {
  background: #FF5F57;
}

.terminal-btn.minimize {
  background: #FFBD2E;
}

.terminal-btn.maximize {
  background: #28CA42;
}

.terminal-title {
  flex: 1;
  text-align: center;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--terminal-text);
  opacity: 0.8;
}

.terminal-spacer {
  width: 60px;
}

/* 终端内容 */
.terminal-body {
  height: 70vh;
  padding: var(--spacing-4);
  overflow-y: auto;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: 1.8;
  color: var(--terminal-text);
}

.terminal-body::-webkit-scrollbar {
  width: 6px;
}

.terminal-body::-webkit-scrollbar-track {
  background: transparent;
}

.terminal-body::-webkit-scrollbar-thumb {
  background: #3A3735;
  border-radius: var(--radius-full);
}

/* 终端行 */
.terminal-line {
  margin-bottom: var(--spacing-1);
  word-break: break-word;
}

.prompt {
  color: var(--terminal-prompt);
  font-weight: 600;
}

/* 标签样式 */
.tag {
  display: inline-block;
  padding: 1px 8px;
  margin-right: var(--spacing-2);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: 500;
}

.tag-name {
  background: var(--tag-name);
  color: #1A1917;
}

.tag-success {
  background: var(--tag-skill-a);
  color: #1A1917;
}

.tag-system {
  background: var(--tag-system);
  color: #1A1917;
}

.tag-warning {
  background: var(--tag-skill-b);
  color: #1A1917;
}

.tag-error {
  background: var(--tag-error);
  color: #1A1917;
}

/* 输入行 */
.terminal-input-line {
  display: flex;
  align-items: center;
  margin-top: var(--spacing-2);
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background: var(--terminal-text);
  animation: cursorBlink 1s ease-in-out infinite;
}

@keyframes cursorBlink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.hidden-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .about-main {
    padding-top: calc(56px + var(--spacing-4));
  }

  .terminal {
    width: 95%;
    border-radius: var(--radius-md);
  }

  .terminal-body {
    height: 65vh;
    font-size: var(--text-xs);
  }
}

@media (max-width: 480px) {
  .terminal {
    width: 100%;
    border-radius: 0;
  }

  .terminal-body {
    height: 60vh;
    padding: var(--spacing-3);
  }

  .terminal-header {
    padding: var(--spacing-2) var(--spacing-3);
  }

  .tag {
    padding: 1px 6px;
    font-size: 10px;
  }
}
</style>
