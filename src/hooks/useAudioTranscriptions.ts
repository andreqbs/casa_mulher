import {useState, useCallback} from 'react';

interface TranscriptionState {
    transcriptions: Array<{
        id: string;
        text: string;
        audioUri: string;
        timestamp: Date;
    }>;
    currentTranscription: string | null;
    isRecording: boolean;
}

/**
 * Hook customizado para gerenciar múltiplas transcrições
 * Útil quando você precisa manter histórico de gravações
 */
export const useAudioTranscriptions = () => {
    const [state, setState] = useState<TranscriptionState>({
        transcriptions: [],
        currentTranscription: null,
        isRecording: false,
    });

    const addTranscription = useCallback((text: string, audioUri: string) => {
        const newTranscription = {
            id: Date.now().toString(),
            text,
            audioUri,
            timestamp: new Date(),
        };

        setState((prev) => ({
            ...prev,
            transcriptions: [newTranscription, ...prev.transcriptions],
            currentTranscription: text,
        }));
    }, []);

    const removeTranscription = useCallback((id: string) => {
        setState((prev) => ({
            ...prev,
            transcriptions: prev.transcriptions.filter((t) => t.id !== id),
        }));
    }, []);

    const clearAllTranscriptions = useCallback(() => {
        setState({
            transcriptions: [],
            currentTranscription: null,
            isRecording: false,
        });
    }, []);

    const setRecordingStatus = useCallback((isRecording: boolean) => {
        setState((prev) => ({
            ...prev,
            isRecording,
        }));
    }, []);

    return {
        transcriptions: state.transcriptions,
        currentTranscription: state.currentTranscription,
        isRecording: state.isRecording,
        addTranscription,
        removeTranscription,
        clearAllTranscriptions,
        setRecordingStatus,
    };
};

// Exemplo de uso:
/*
function MyComponent() {
    const {
        transcriptions,
        currentTranscription,
        addTranscription,
        removeTranscription,
        clearAllTranscriptions
    } = useAudioTranscriptions();

    return (
        <View>
            <AudioRecorderWithTranscription
                googleCloudApiKey="YOUR_KEY"
                onTranscriptionComplete={(text, uri) => {
                    addTranscription(text, uri);
                }}
            />
            
            <FlatList
                data={transcriptions}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.text}</Text>
                        <Text>{item.timestamp.toLocaleString()}</Text>
                        <Button 
                            title="Remover" 
                            onPress={() => removeTranscription(item.id)}
                        />
                    </View>
                )}
            />
        </View>
    );
}
*/
