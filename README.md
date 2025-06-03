# SmartList 🛒✨

**Smart Grocery Planning Made Simple**

SmartList is an intelligent grocery list app that transforms your recipe planning experience. With AI-powered recipe parsing and intuitive sticky note-style lists, grocery shopping has never been easier.

https://github.com/user-attachments/assets/b0037336-279a-4db6-ac9b-725ef10337b5

## 🌟 Features

### 📝 Multiple Grocery Lists
- Create unlimited grocery lists with colorful sticky note designs
- Each list has its own unique color and name
- Switch between lists seamlessly

### 🤖 AI Recipe Magic
- **Recipe-to-Ingredients Parsing**: Paste any recipe and let AI extract ingredients automatically
- **Smart Ingredient Detection**: Automatically categorizes ingredients (Produce, Dairy, Meat & Seafood, etc.)
- **Selective Adding**: Choose which ingredients to add and which to skip
- **Multi-List Support**: Select which grocery list to add parsed ingredients to

### ✅ Smart List Management
- Check off items as you shop
- Delete items you no longer need
- Clean, intuitive interface
- Real-time list updates

### 💎 Premium Features
- Unlimited recipe parsing (Free tier: 3 recipes)
- Enhanced AI processing
- Premium badge and priority support

## 🏗️ Architecture

```
SmartList/
├── App.tsx                 # Main application component
├── components/
│   ├── Icon.tsx           # Custom icon component
│   ├── StickyNote.tsx     # Grocery list and item components
│   └── Modals.tsx         # All modal dialogs
├── screens/
│   ├── OverviewScreen.tsx # Lists overview with sticky notes
│   ├── ListScreen.tsx     # Individual list management
│   └── RecipeScreen.tsx   # Recipe parsing interface
├── services/
│   └── GeminiService.js   # AI recipe parsing service
└── styles/
    └── AppStyles.js       # Application styling
```

## 🚀 Getting Started

### Prerequisites
- React Native development environment
- Node.js and npm/yarn
- Google Gemini API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ullahs3/smartlist.git
   cd smartlist
   ```

2. **Initialize React Native project** 
   ```bash
   npx react-native init SmartList 
   cd SmartList
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   
   # Install AsyncStorage for data persistence
   npm install @react-native-async-storage/async-storage
   ```

4. **Configure API Key**
   
   Replace the API key in `App.tsx`:
   ```javascript
   const [geminiService] = useState(() => new GeminiService(
     'YOUR_GEMINI_API_KEY_HERE', // Replace with your actual API key
     isPremium
   ));
   ```

4. **Run the application**
   ```bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   ```

## 📱 How to Use

### Creating Your First List
1. Open the app to see the overview screen
2. Tap "Create New List" 
3. Enter a name for your list
4. Start adding items manually or use Recipe Magic

### Using Recipe Magic 🪄
1. Navigate to the "Recipe Magic" tab
2. Paste or type your recipe in the text area
3. Tap "Parse Recipe" to extract ingredients
4. If you have multiple lists, choose which list to add to
5. Review the extracted ingredients and uncheck any you already have
6. Tap "Add Selected" to add ingredients to your chosen list

### Managing Lists
- **Switch Lists**: Tap on any sticky note in the overview
- **Delete Lists**: Long press or use the delete option
- **Add Items**: Type in the input field and tap the add button
- **Check Off Items**: Tap the checkbox next to each item
- **Delete Items**: Swipe or use the delete option

## 🧠 AI Features

### Recipe Parsing Intelligence
The app uses Google's Gemini AI to:
- Extract ingredients from any recipe format
- Understand quantities and measurements
- Categorize ingredients automatically
- Handle various recipe styles and formats

### Fallback Logic
If AI parsing fails, the app includes intelligent local parsing that:
- Recognizes common ingredients by keywords
- Suggests ingredient lists based on recipe type
- Ensures you always get usable results

### Usage Limits
- **Free Tier**: 3 recipe parses
- **Premium**: Unlimited parsing
- Usage tracking with visual indicators

## 🛠️ Technical Details

### Key Dependencies
- **React Native**: Mobile app framework
- **AsyncStorage**: Local data persistence
- **Google Gemini API**: AI recipe parsing
- **Custom Components**: Styled UI elements

### Data Structure
```javascript
// Grocery List
{
  id: string,
  name: string,
  color: string,
  createdAt: number,
  items: GroceryItem[]
}

// Grocery Item
{
  id: number,
  name: string,
  completed: boolean,
  category: string,
  fromRecipe?: boolean
}
```

### State Management
- Local state with React hooks
- AsyncStorage for persistence
- Real-time updates across components

## 🎨 Design Features

### Sticky Note Interface
- 8 vibrant colors for list organization
- Intuitive visual design
- Touch-friendly interactions

## 🔒 Privacy & Security

- All data stored locally on device
- API calls made securely to Google services
- No personal data collection beyond usage statistics
- Recipe content processed temporarily for parsing only

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:
- Code style requirements
- Pull request process
- Issue reporting
- Feature requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for intelligent recipe parsing
- React Native community for excellent tooling

## 📞 Support

For support, feature requests, or bug reports:
- Open an issue on GitHub
- Contact us at: saifullahl5210@gmail.com
- Connect on LinkedIn: [linkedin.com/in/saifullah5](https://linkedin.com/in/saifullah5)

---

**Made by Saif Ullah**

*Smart grocery planning for the modern cook*
